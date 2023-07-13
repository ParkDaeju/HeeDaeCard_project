var nodemailer = require('nodemailer');

//smtp 서버를 사용하기 위한 모듈

var smtpPool=require('nodemailer-smtp-pool');

// nodemailer 의 createTransport는 transporter 객체를 만드는 메소드!입니다!

//아래 메소드 참조값 변수 smtpTransport 는 nodemailer-smtp-pool 객체 인스턴스에 인자값으로 쓰입니다!
    
    var authNum = Math.floor(Math.random() * 1000000) + 100000;      //랜덤한 인증번호를 생성한다.
    if (authNum > 1000000) {
      authNum = authNum - 100000;
    }
var smtpTransport=nodemailer.createTransport(smtpPool( {
    service:'Naver',
    host:'lsmtp.naver.com',
    port:'587',
    tls:{
        rejectUnauthorize:false
    },
    //이메일 전송을 위해 필요한 인증정보
    //gmail 계정과 암호 
    auth:{
        user:'primejune@naver.com',
        pass:'bravojunezzang1'
    },
    maxConnections:5,
    maxMessages:10
}) );
var mailOpt={
    from:'primejune@naver.com',
    to:'primejune@naver.com',
    subject:'Nodemailer 테스트',
    html:"인증번호는 " + authNum + "입니다."
}
smtpTransport.sendMail(mailOpt, function(err, res) {
    if( err ) {
        console.log(err);
    }else{
        console.log('Message send :'+ res);
    }
    smtpTransport.close(); 
})


