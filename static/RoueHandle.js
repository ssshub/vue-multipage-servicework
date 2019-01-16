class RoueHandle {
  constructor() {
    this.filters = []
  }

  addFilter(filter) {
    this.filters.push(filter)
  }

  create(match) {
    let obj = {}
    if (typeof match == "function") {
      obj.match = match
    } else {
      obj.match = function (url) {
        return match.test(url)
      }
    }
    let me = this
    return function ({url, event}) {
      let href = url.href;
      if (!me.filterRoute(href)) {
        return false
      }
      return this.match(href)
    }.bind(obj)
  }

  filterRoute(url) {
    let f = this.filters
    for (let i = 0; i < f.length; i++) {
      if (!f[i].test(url)) {
        return false
      }
    }
    return true
  }
}
