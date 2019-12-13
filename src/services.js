'use strict';
const chalk = require('chalk');

let cwd = process.cwd();
let dirname = __dirname;
if (cwd !== dirname) {
    console.error(chalk.red('[ERROR]:cli.js must be run in \`nodejs-sdk/packages/cli/\` directory'));
    process.exit(-1);
}

const FLAGS = require('./interfaces/base').FLAGS;
const yargs = require('yargs/yargs');
const fs = require('fs');
const path = require('path');
const utils = require('../api/common/utils');
const { ContractsDir, ContractsOutputDir } = require('./constant');
const isArray = require('isarray');
const getAbi = require('./interfaces/base').getAbi;
const Configuration = require('../api/common/configuration').Configuration;


Configuration.setConfig(path.join(__dirname, './conf/config.json'));

let interfaces = [];
interfaces = interfaces.concat(require('./interfaces/account').interfaces);
interfaces = interfaces.concat(require('./interfaces/web3j').interfaces);
interfaces = interfaces.concat(require('./interfaces/crud').interfaces);
interfaces = interfaces.concat(require('./interfaces/permission').interfaces);
interfaces = interfaces.concat(require('./interfaces/cns').interfaces);


const e3=require('/home/fisco-bcos/nodejs-sdk/packages/api/web3j').Web3jService;
let we=new e3();


var express = require('express');
var app = express();
const http = require("http"),
      url = require("url");


 http.createServer(function(request,response){

        var requset_url = request.url;

        var strurl  = url.parse(requset_url,true).query
      //  var sum = Number(strurl.username)+Number(strurl.password)
	var Num=strurl.Num;
	var From=strurl.From;
	var To=strurl.To;
	var Mount=strurl.Mount;
	var Deadline=strurl.Deadline;
	var content;
	if(Deadline==null)
	{
		if(From==null)//银行融资
		{
			console.log("rongzhi");
			var content = fs.readFileSync('public/res2.html');
			var s=[];
			s.push(Num);
			s.push(To);
			var promise2 = new Promise(function(resolve, reject) {
				resolve(we.sendRawTransaction("0xe4a741c3b8209e5e2fc443ace071fd950f875128","GradeWithBank(string,string)",s));
			});
			
			promise2.then(function(value) {
					console.log(value);
				});
			
		}
		else if(To==null)//还款
		{
			console.log("Repay");
			var content = fs.readFileSync('public/res3.html')
			      // content= content.toString().replace('{{sum}}',sum);
			
			var s=[];
			s.push(Num);
			s.push(From);
			
			var promise2 = new Promise(function(resolve, reject) {
				resolve(we.sendRawTransaction("0xe4a741c3b8209e5e2fc443ace071fd950f875128","Repay(string,string)",s));
			});
			
			promise2.then(function(value) {
					console.log(value);
				});
			
		}
		
		
	}
	else//交易
	{
		//console.log(From);
 		console.log("jiaoyi");
		var content = fs.readFileSync('public/res.html')
		// content= content.toString().replace('{{sum}}',sum);
		/*var s=[];
		s.push(Num);
		s.push(From);
		s.push(To);
		s.push(Mount);
		s.push(Deadline);*/
		var s=["1","a","b","100","2019"];
		var promise4 = new Promise(function(resolve, reject) {
		resolve(we.sendRawTransaction("0xe4a741c3b8209e5e2fc443ace071fd950f875128","Grade(string,string, string,int256,int256)",s));
		});
		//0x11b6d7495f2f04bdca45e9685ceadea4d4bd1832
		promise4.then(function(value) {
		console.log(value);
   


		});

	}

        

	content= content.toString().replace('{{Num}}',Num);
	content= content.toString().replace('{{From}}',From);
	content= content.toString().replace('{{To}}',To);
	content= content.toString().replace('{{Mount}}',Mount);
	content= content.toString().replace('{{Deadline}}',Deadline);

      //  console.log(content)
        response.end(content)
    }).listen(8080,function(){
        console.log('服务启动!!!')
    })
	
