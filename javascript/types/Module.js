import JSDict from '../core/JSDict'
import { create_pyclass } from '../core/types'


/*************************************************************************
 * A Python module type
 *************************************************************************/

export default class Module extends JSDict {
    constructor(name, filename, pkg) {
        super()

        this.__name__ = name
        this.__file__ = filename
        this.__package__ = pkg
    }
}
create_pyclass(Module, 'module')
