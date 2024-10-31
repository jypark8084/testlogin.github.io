// Firebase 설정 - 자신의 Firebase 설정으로 교체해야 합니다.
const firebaseConfig = {
  apiKey: "AIzaSyAG77bT0YaKUX33IrSjV3cc4N3nKdC_dY4",
  authDomain: "testlogin-8f196.firebaseapp.com",
  projectId: "testlogin-8f196",
  storageBucket: "testlogin-8f196.appspot.com",
  messagingSenderId: "844746942507",
  appId: "1:844746942507:web:2d15058ffd6f692243626e",
  measurementId: "G-20WL1R0QYG"
};

// Firebase 초기화
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.getAuth(app);

// 회원가입 함수
async function signUp() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const userCredential = await firebase.createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 이메일 인증 메일 전송
    await firebase.sendEmailVerification(user);
    alert("회원가입이 완료되었습니다. 인증 메일을 확인하세요.");

  } catch (error) {
    console.error("회원가입 오류:", error.message);
    alert("회원가입 실패: " + error.message);
  }
}

// 로그인 함수
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await firebase.signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user.emailVerified) {
      alert("로그인 성공!");
    } else {
      alert("이메일 인증 후 로그인 가능합니다.");
    }
  } catch (error) {
    console.error("로그인 오류:", error.message);
    alert("로그인 실패: " + error.message);
  }
}

// 이메일 링크 로그인 함수
async function signInWithEmailLink() {
  const email = document.getElementById("linkLoginEmail").value;

  // 이메일 링크 로그인 옵션 설정
  const actionCodeSettings = {
    url: 'https://your-app-url.com', // 실제 리디렉션할 URL로 변경
    handleCodeInApp: true
  };

  try {
    // 이메일 링크 전송
    await firebase.sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
    alert('로그인 링크가 이메일로 전송되었습니다.');

  } catch (error) {
    console.error("이메일 링크 전송 오류:", error.message);
    alert("이메일 링크 전송 실패: " + error.message);
  }
}

// 이메일 링크로 로그인 확인 및 처리
window.onload = function() {
  if (firebase.isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');

    if (!email) {
      email = prompt('로그인에 사용할 이메일을 입력해주세요.');
    }

    firebase.signInWithEmailLink(auth, email, window.location.href)
      .then(result => {
        window.localStorage.removeItem('emailForSignIn');
        alert('로그인 성공!');
      })
      .catch(error => {
        console.error("이메일 링크 로그인 오류:", error.message);
        alert("로그인 실패: " + error.message);
      });
  }
}
