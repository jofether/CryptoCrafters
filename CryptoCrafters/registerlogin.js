// registerlogin.js
import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebase.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';

// Handle label interaction based on input field focus, blur, or keyup events
$('.form').find('input, textarea').on('keyup blur focus', function (e) {
    var $this = $(this),
        label = $this.prev('label');

    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {
        if ($this.val() === '') {
            label.removeClass('highlight');
        } else if ($this.val() !== '') {
            label.addClass('highlight');
        }
    }
});

// Handle tab switch between sign-up and login forms
$('.tab a').on('click', function (e) {
    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    const target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();
    $(target).fadeIn(600);
});

$(document).ready(function() {
    // Sign-up button functionality
    $('#signup-btn').click(function () {
        const firstName = $('#first-name').val();
        const lastName = $('#last-name').val();
        const email = $('#email').val();
        const password = $('#password').val();

        // Ensure all fields are filled
        if (!firstName || !lastName || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Firebase Auth method for creating a user
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const user = userCredential.user;
            console.log('User registered:', user);

            // Save user details to Firestore
            await setDoc(doc(db, "users", user.uid), {
              firstName: firstName,
              lastName: lastName,
              email: email
            });

            // Inform the user and redirect to home page
            alert('Registration successful!');
            window.location.href = '/home.html';
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error registering user:', errorCode, errorMessage);
            alert('Error during registration: ' + errorMessage);
          });
    });

    // Login button functionality
    $('#login-btn').click(function() {
        const email = $('#login-email').val();
        const password = $('#login-password').val();

        // Ensure both email and password are provided
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

        // Firebase Auth method for signing in
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User logged in:', user);

                // Redirect to home page after successful login
                window.location.href = '/home.html'; // Replace with your target page
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error logging in:', errorCode, errorMessage);
                alert('Error during login: ' + errorMessage);
            });
    });
    
    // Check if a user is already authenticated
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Redirect already logged-in users to the home page
            window.location.href = '/home.html';
        }
    });
});
