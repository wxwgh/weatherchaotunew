/**
 * 用户信息
 * @Author: hb
 * @Date: 2021-06-17
 */
const Buffer =require('buffer').Buffer;
const crypto = require('crypto-js');
const secretKey = crypto.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
const iv = crypto.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

export function encrypt(text) {
    var encrypted = crypto.AES.encrypt(text, secretKey, {
        mode: crypto.mode.ECB,
        padding: crypto.pad.Pkcs7
    });
    return encrypted.toString();
};

export function decrypt(hash) {
    var decrypt = crypto.AES.decrypt(hash, secretKey, {
        mode: crypto.mode.ECB,
        padding: crypto.pad.Pkcs7
    });
    return crypto.enc.Utf8.stringify(decrypt).toString();
};