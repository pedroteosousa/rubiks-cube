"use strict"

class Scramble {
  static parse(scramble) {
    const parseModifiers = function(modifiersString) {
      let modifiers = []
      let suffix = modifiersString
      while (true) {
        let modifier = ""
        if (suffix[0] === "'") modifier = "'"
        else {
          modifier = suffix.match(/^[0-9]+/)
          if (modifier === null) modifier = ""
          else modifier = modifier[0]
        }
        if (modifier.length === 0) break
        modifiers.push(modifier)
        suffix = suffix.substring(modifier.length)
      }
      return modifiers
    }
    // parsing commutators and conjugates
    const parseSpecial = function(scramble) {
      const info = Scramble._special(scramble)
      const left = Scramble._joinTokens(info.leftTokens)
      const right = Scramble._joinTokens(info.rightTokens)
      if (info.type === ',')
        return [left, right, Scramble.inverse(left), Scramble.inverse(right)].join(' ')
      else if (info.type === ':')
        return [left, right, Scramble.inverse(left)].join(' ')
      else
        return left
    }
    const applyModifiers = function(token) {
      const modifiers = parseModifiers(token.modifiers)
      let moves = token.moves
      if ("({".indexOf(moves[0]) !== -1)
        moves = Scramble.parse(moves.substring(1, moves.length-1))
      else if ("[".indexOf(moves[0]) !== -1) {
        moves = Scramble.parse(parseSpecial(moves))
      }
      for (const i in modifiers) {
        const modifier = modifiers[i]
        if (modifier === "'") moves = Scramble.inverse(moves)
        else {
          const number = parseInt(modifier)
          moves = Array(number).fill(moves).join(' ')
        }
      }
      return moves
    }
    const tokens = Scramble._tokenize(scramble).map(token => applyModifiers(token))
    return tokens.join(' ')
  }
  static inverse(scramble) {
    // invert commutators and conjugates
    const inverseSpecial = function(scramble) {
      const info = Scramble._special(scramble)
      if (info.type == ',')
        return '['+Scramble._joinTokens(info.rightTokens)+', '+Scramble._joinTokens(info.leftTokens)+']'
      else if (info.type == ':')
        return '['+Scramble._joinTokens(info.leftTokens)+': '+Scramble.inverse(Scramble._joinTokens(info.rightTokens))+']'
      return scramble
    }
    const inverseToken = function(token) {
      let modifiers = token.modifiers
      if (modifiers.length !== 0 && modifiers[modifiers.length-1] === "'") {
        modifiers = modifiers.substring(0, modifiers.length-1)
        return token.moves + modifiers
      }
      if (token.moves[0] === '[') token.moves = inverseSpecial(token.moves)
      else modifiers += "'"
      return token.moves + modifiers
    }
    return Scramble._tokenize(scramble).map(token => inverseToken(token)).reverse().join(' ')
  }
  static _tokenize(scramble) {
    const firstToken = function(scramble) {
      const firstMove = scramble.match(/^[A-Za-z]+[0-9']*/)
      if (firstMove !== null) {
        const moves = firstMove[0].match(/[A-Za-z]+/)[0]
        const suffix = scramble.substring(moves.length)
        let modifiers = suffix.match(/^[0-9']+/)
        if (modifiers === null) modifiers = ""
        else modifiers = modifiers[0]
        return {
          moves,
          modifiers
        }
      }
      const groups = "()[]{}"
      let groupsCount = [0, 0, 0]
      for (const i in scramble) {
        const index = groups.indexOf(scramble[i])
        if (index >= 0) {
          const group = Math.floor(index / 2)
          if (index % 2) groupsCount[group]--
          else groupsCount[group]++
        }
        let isOk = true
        for (const group in groupsCount) {
          isOk = isOk && (groupsCount[group] == 0)
        }
        if (isOk) {
          const moves = scramble.substring(0, parseInt(i)+1)
          const suffix = scramble.substring(parseInt(i)+1)
          let modifiers = suffix.match(/^[0-9']+/)
          if (modifiers === null) modifiers = ""
          else modifiers = modifiers[0]
          return {
            moves,
            modifiers
          }
        }
      }
    }

    let tokens = []
    let suffix = scramble
    while (true) {
      const beginToken = suffix.match(/[A-Za-z\[\(\{]/)
      if (beginToken === null) break
      const index = beginToken.index
      const token = firstToken(suffix.substring(index))
      if (token === null) break
      tokens.push(token)
      suffix = suffix.substring(index + token.moves.length)
    }
    return tokens
  }
  static _joinTokens(tokens) {
    return tokens.map(token => token.moves + token.modifiers).join(' ')
  }
  // get more information about commutator or conjugate
  static _special(scramble) {
    if (scramble[0] !== '[' || scramble[scramble.length-1] !== ']') return null
    scramble = scramble.substring(1, scramble.length-1).trim()
    const tokens = Scramble._tokenize(scramble)
    let info = {
      leftTokens: [],
      rightTokens: [],
      type: ''
    }
    for (const i in tokens) {
      if (",:".indexOf(scramble[0]) !== -1) {
        info.type = scramble[0]
        scramble = scramble.substring(1).trim()
      }
      const token = tokens[i]
      if (info.type === '') info.leftTokens.push(token)
      else info.rightTokens.push(token)
      scramble = scramble.replace(token.moves + token.modifiers, '').trim()
    }
    return info
  }
}

module.exports = Scramble