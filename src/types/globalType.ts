interface GlobalType {
  baseUrlDev: string
  indexPath: string
  isHighInterface: string
  logoBgUrl: string
  cmsName: string
  logoUrl: string
  loginLeftImgUrl: string
}

declare global {
  interface Window {
    globalVar: GlobalType
  }
}
export {}

// https://stackoverflow.com/questions/57132428
// https://ts.xcatliu.com/basics/type-of-array.html#declare-global
// 这种写法报错eslint会报错
// interface Window {
//   globalVar: GlobalType
// }
