require(['./dist/js/VerificationCode.min'], function(VerificationCode) {
	// console.log(VerificationCode);
	VerificationCode.get("verificationCode-image", {
		api: "/api/..."
	});

	VerificationCode.get("verificationCode-message", {
		//e.g.
		countTime: 5, //倒计时
		telNum: "", //电话号码
		api: "api/message/.." //发送短信api
	});
});
