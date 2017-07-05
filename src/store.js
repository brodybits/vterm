import { observable }                   from 'mobx'
import { loadConfig }                   from './config'
import { config, babelrc }              from './paths'
import { remote }                       from 'electron'
import defaultShell                     from 'default-shell'
import defaultColors, { customPalette } from './defaults/colors'
import { mergeArrays }                  from './utils/arrays'

const mergedColors = mergeArrays(defaultColors, customPalette)

class Store {

  @observable tabs           = []
  @observable selectedTab    = 0
  @observable config         = loadConfig()
  @observable windowTitle    = (this.tabs[this.selectedTab]) ? this.tabs[this.selectedTab].title : ''
  @observable elements       = this.config.customElements || {}
  @observable isMaximized    = false
  @observable isFocused      = false
  @observable shell          = this.config.shell          || defaultShell
  @observable shellArguments = this.config.shellArguments || []
  @observable terminalColors = mergeArrays(mergedColors, this.config.colors || [])
  @observable customCss      = this.config.css            || ''

}

const store = new Store

remote.getCurrentWindow().on('focus',      () => store.isFocused = true)
remote.getCurrentWindow().on('blur',       () => store.isFocused = false)

export default store
