import JSEncrypt from 'jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey: string =
  'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALHpYIXHwoA8JSyVU2dfMVczHw1+gBmD\n' +
  'Awy9XQyfGI8YRFnvc40gLU0+Wc+6N31NVFmUZYs8qQ0cNbBj2rAZjT0CAwEAAQ=='

const privateKey: string =
  'MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEAselghcfCgDwlLJVT\n' +
  'Z18xVzMfDX6AGYMDDL1dDJ8YjxhEWe9zjSAtTT5Zz7o3fU1UWZRlizypDRw1sGPa\n' +
  'sBmNPQIDAQABAkEApIMSHwK1pxB2q4A1TFwo6uI5r6eu2mhcFJayCS7AbefNjxxF\n' +
  'iglwWUydyBqbacREOe43rkA/BDY6N94OQhwuwQIhAOgkmLqjxLsNbZWZmdzZ7295\n' +
  'vZyOCkQ61aVJOZXreoyRAiEAxDIE5eh2NLftOb8s6BoIz7a4tIQPQ1MWefilfP1A\n' +
  'O+0CIQCTNJG82Jip3Kv+z3Yn+/K/B73bBp8wAPb1ZuejT71YYQIgHih6LEURdoUX\n' +
  'SBsk8gCefh9eQRFTr0ukVtdryMy9BPkCIQDK7rOkDWUawYzU4ZpRvX4G8iVWGQ2P\n' +
  'cXCbOml/AOWcmg=='

// 加密
export function encrypt(txt: string) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) as string // 对数据进行加密
}

// 解密
export function decrypt(txt: string) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) as string // 对数据进行解密
}
