import * as admin from './admin'
import * as student from './student'
import * as teacher from './teacher'

export default {
    ...admin,
    ...student,
    ...teacher
}