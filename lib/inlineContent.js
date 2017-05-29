'use strict';

var Promise = require('bluebird'),
    extractCss = require('extract-css'),
    inlineCss = require('./inline-css'),
    interpol = require('./interpol.js');

module.exports = function inlineContent(src, options) {
    return new Promise(function (resolve, reject) {
        var content;

        if (!options.url) {
            reject('options.url is required');
        }

        if(options.protect){
            
            var protectStrings = interpol().protect(src,options.protect);
            src = protectStrings.src;
            var replacePairs = protectStrings.replacePairs;
        }



        extractCss(src, options, function (err, html, css) {
            var extraCss;

            if (err) {
                return reject(err);
            }

            extraCss = css + '\n' + options.extraCss;

            try {
                content = inlineCss(html, extraCss, options);
                if(options.protect){
                    content = interpol().unProtect(content,replacePairs);
                }
            } catch (e) {
                return reject(e);
            }

            resolve(content);
        });
    });

};
