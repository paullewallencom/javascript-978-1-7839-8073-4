import log, {timeLog} from 'es6!./log'

export var now = Date.now()

export function logTime() {
  log(now)
}

export function logDate() {
  timeLog('monday')
}
