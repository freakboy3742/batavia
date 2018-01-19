import BigNumber from 'bignumber.js'

import * as types from '../types'

export default function round(number, ndigits=0) {
    var result = 0
    if (types.isinstance(args[0], types.PyBool)) {
        result = args[0].__int__()
    } else {
        result = new BigNumber(args[0]).round(p)
    }
    if (args.length === 1) {
        return new types.PyInt(result)
    }
    return types.PyFloat(result.valueOf())
}

round.__doc__ = 'round(number[, ndigits]) -> number\n\nRound a number to a given precision in decimal digits (default 0 digits).\nThis returns an int when called with one argument, otherwise the\nsame type as the number. ndigits may be negative.'
round.$pyargs = {
    args: ['number'],
    default_args: ['ndigits']
}