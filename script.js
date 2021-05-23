let button = document.querySelector('button')
let car1 = document.querySelector('.car1')
let car2 = document.querySelector('.car2')
let span1 = document.querySelector('.car1count')
let span2 = document.querySelector('.car2count')
let car1count = 0
let car2count = 0
// alert selectors
let divAlert = document.querySelector('.alert')
let alertMessage = document.querySelector('.alert span')
let alertForm = document.querySelector('.alert form')
let alertSubmit = document.querySelector('.alert input[type="submit"]')
// alert function
function customDivAlert(msg) {
    divAlert.style.opacity = 'initial'
    divAlert.style.display = 'initial'
    alertMessage.innerHTML = msg
    alertForm.addEventListener('submit', function (event) {
        event.preventDefault()
        button.removeAttribute('disabled')
        divAlert.style.opacity = 0
        setTimeout(function () {
            divAlert.style.display = 'none'
        }, 750)
    })
}
// prompt selectors
let divPrompt = document.querySelector('.prompt')
let promptMessage = document.querySelector('.prompt span')
let promptForm = document.querySelector('.prompt form')
let promptText = document.querySelector('.prompt input[type="text"]')
promptText.value = null
// prompt function
async function customDivPrompt(msg) {
    divPrompt.style.opacity = 'initial'
    divPrompt.style.display = 'initial'
    promptMessage.innerHTML = msg
    promptText.focus()
    let formEvent = new Promise(function (resolve) {
        promptForm.addEventListener('submit', function (event) {
            event.preventDefault()
            divPrompt.style.opacity = 0
            setTimeout(function () {
                divPrompt.style.display = 'none'
            }, 750)
            return resolve(promptText.value)
        })
    })
    return await formEvent
}
customDivPrompt('To how many points do you want to play up to?<br /><br />MIN: 1<br />MAX: 25').then(function (maxCountChoice) {
    function maxCountChoiceFn() {
        if (maxCountChoice >= 1 && maxCountChoice <= 25) {
            return maxCountChoice
        }
        location.reload()
    }
    maxCountChoiceFn()
    button.addEventListener('click', function () {
        button.setAttribute('disabled', 'disabled')
        car1.classList.add('transition')
        car2.classList.add('transition')
        let car1win = (Math.random() + 10) * 250
        car1.style.transitionDuration = car1win + 'ms'
        let car2win = (Math.random() + 10) * 250
        car2.style.transitionDuration = car2win + 'ms'
        car1.style.marginLeft = '90vw'
        car2.style.marginLeft = '90vw'
        function timeoutHelper() {
            if (car1win < car2win) {
                return car2win
            }
            else if (car1win > car2win) {
                return car1win
            }
            else if (car1win === car2win) {
                return car1win
            }
        }
        setTimeout(function () {
            car1.classList.remove('transition')
            car2.classList.remove('transition')
            car1.style.transitionDuration = null
            car2.style.transitionDuration = null
            car1.style.marginLeft = null
            car2.style.marginLeft = null
        }, timeoutHelper())
        setTimeout(function () {
            if (car1win < car2win) {
                customDivAlert('Car 1 won this round.')
                span1.innerHTML = ++car1count
                announceWinner(maxCountChoice)
            }
            else if (car1win > car2win) {
                customDivAlert('Car 2 won this round.')
                span2.innerHTML = ++car2count
                announceWinner(maxCountChoice)
            }
            else if (car1win === car2win) {
                customDivAlert('Draw?')
            }
        }, timeoutHelper() + 250)
    })
    function announceWinner(maxCount) {
        if (car1count >= maxCount) {
            customDivAlert(`Car 1 has won the game with ${maxCount} point/s!`)
            alertForm.remove()
            divAlert.innerHTML += '<button class="btnDefault" onclick="location.reload()">Retry</button>'
        }
        else if (car2count >= maxCount) {
            customDivAlert(`Car 2 has won the game with ${maxCount} point/s!`)
            alertForm.remove()
            divAlert.innerHTML += '<button class="btnDefault" onclick="location.reload()">Retry</button>'
        }
    }
})