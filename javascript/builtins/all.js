import { call_method } from '../core/callables'
import { PyStopIteration, PyTypeError } from '../core/exceptions'
import { type_name } from '../core/types'

import * as types from '../types'

export default function all(iterable) {
    try {
        var iterobj = call_method(iterable, '__iter__', [])

        while (true) {
            var next = call_method(iterobj, '__next__', [])
            var bool_next = call_method(next, '__bool__', [])
            if (!bool_next) {
                return false
            }
        }
    } catch (err) {
        if (!(types.isinstance(err, PyStopIteration))) {
            throw new PyTypeError("'" + type_name(iterable) + "' object is not iterable")
        }
    }

    return new types.PyBool(true)
}

all.__name__ = 'all'
all.__doc__ = `all(iterable) -> bool

Return True if bool(x) is True for all values x in the iterable.
If the iterable is empty, return True.`
all.$pyargs = {
    args: ['iterable']
}
