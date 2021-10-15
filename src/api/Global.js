export default class Global {
  //기본 프로필 이미지
  static basicImg = "https://firebasestorage.googleapis.com/v0/b/madetwitter-9a430.appspot.com/o/common%2Fgreen.jpg?alt=media&token=4ce81e5e-a082-4d64-94af-0619e1b26cdb";
  /**
	 * 이메일 주소 체크
	*/
	static checkEmail(email){
		const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
		let message = '';

		if(email === '') message = '이메일를 입력해주세요.';
		else if (regex.test(email)) message = '';
		else message = '사용 가능한 이메일을 입력해 주세요.';

		return message;
	}

  /**
	 * 비밀번호 체크
	 */
	static CheckPassword(password) { 
		const regex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;
		let message = '';

		if(password === '') message = '패스워드를 입력해주세요.';
		else if(regex.test(password)) message = '';
		else message = '영문,숫자, 특수문자 조합 6~20자';

		return message;
	}

	//회원가입/로그인시 에러메세지 처리
	static authErrorMessage(error){
		let errorMessage ="";
		switch(error){
			case "auth/account-exists-with-different-credential":
					errorMessage = '중복된 구글계정이 사용중입니다.';
					break;
			case "auth/email-already-in-use":
					errorMessage = '이미 사용중인 이메일 입니다.';
					break;
			case "auth/invalid-email":
					errorMessage = '유효하지 않은 메일입니다';
					break;
			case "auth/operation-not-allowed":
					errorMessage = '이메일 가입이 중지되었습니다.'
					break;
			case "auth/weak-password":
					errorMessage = '비밀번호를 6자리 이상 필요합니다.'
					break;
			case "auth/user-not-found":
					errorMessage = '가입된 이메일이 아닙니다.'
					break;
			case "auth/wrong-password":
					errorMessage = '틀린 비밀번호입니다.'
					break;
			default: errorMessage = error;
		}
		return errorMessage;
	}
}