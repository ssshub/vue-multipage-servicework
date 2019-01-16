class RouteFilter {
  constructor(reg) {
    this.reg = reg
    this.pageNeedMatch = true
    this.htmlReg = /.html$|.html\?/
  }

  test(url) {
    if (this.isHtml(url)) {
      let rv = this.reg.test(url)
      this.pageNeedMatch = rv
      return rv
    }
    return this.pageNeedMatch
  }

  isHtml(url) {
    return this.htmlReg.test(url)
  }
}


