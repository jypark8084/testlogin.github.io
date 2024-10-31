// Import Firebase SDKs for App and Auth
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

// Firebase 설정 - 자신의 Firebase 설정으로 교체해야 합니다.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 회원가입 함수
async function signUp() {
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
}

// 로그인 함수
async function login() {
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
}

export { signUp, login };
