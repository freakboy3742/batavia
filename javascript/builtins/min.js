import { BataviaError, StopIteration, TypeError, ValueError } from '../core/exceptions'
import { type_name, PyNone } from '../core/types'

import { tuple } from '../builtins'

export default function min(iterable, args, kwargs) {
    var iterobj
    if (args.length > 0) {
        iterobj = tuple(iterable, ...args).__iter__()
    } else {
        if (!iterable.__iter__) {
            throw new TypeError("'" + type_name(iterable) + "' object is not iterable")
        }
        iterobj = iterable.__iter__()
    }

    // If iterator is empty returns an error or default value
    try {
        var min = iterobj.__next__()
    } catch (err) {
        if (err instanceof StopIteration) {
            if ('default' in kwargs) {
                return kwargs['default']
            } else {
                throw new ValueError('min() arg is an empty sequence')
            }
        } else {
            throw err
        }
    }

    try {
        while (true) {
            var next = iterobj.__next__()
            if (next.__lt__(min).valueOf()) {
                min = next
            }
        }
    } catch (err) {
        if (!(err instanceof StopIteration)) {
            throw err
        }
    }
    return min
}

min.__doc__ = 'min(iterable, *[, default=obj, key=func]) -> value\nmin(arg1, arg2, *args, *[, key=func]) -> value\n\nWith a single iterable argument, return its smallest item. The\ndefault keyword-only argument specifies an object to return if\nthe provided iterable is empty.\nWith two or more arguments, return the smallest argument.'
min.$pyargs = {
    args: ['iterable'],
    kwonlyargs: ['default', 'key']
}