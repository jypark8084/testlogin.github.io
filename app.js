// Import Firebase SDKs for App and Auth
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 회원가입 함수
window.signUp = async function() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 이메일 인증 메일 전송
    await sendEmailVerification(user);
    alert("회원가입이 완료되었습니다. 인증 메일을 확인하세요.");

  } catch (error) {
    console.error("회원가입 오류:", error.message);
    alert("회원가입 실패: " + error.message);
  }
};

// 로그인 함수
window.login = async function() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
};
