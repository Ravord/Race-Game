let button = document.querySelector('button')
let car1 = document.querySelector('.car1')
let car2 = document.querySelector('.car2')
let span1 = document.querySelector('.car1count')
let span2 = document.querySelector('.car2count')
let car1count = 0
let car2count = 0
let maxCountChoice = prompt('To how many points do you want to play up to?\n\nMIN: 1\nMAX: 25\n\n')
function maxCountChoiceFn() {
    if (maxCountChoice >= 1 && maxCountChoice <= 25) {
        return maxCountChoice
    }
    maxCountChoice = prompt('To how many points do you want to play up to?\n\nMIN: 1\nMAX: 25\n\n')
    return maxCountChoiceFn()
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
            alert('Car 1 won this round.')
            span1.innerHTML = ++car1count
            announceWinner(maxCountChoice)
        }
        else if (car1win > car2win) {
            alert('Car 2 won this round.')
            span2.innerHTML = ++car2count
            announceWinner(maxCountChoice)
        }
        else if (car1win === car2win) {
            alert('Draw?')
        }
        button.removeAttribute('disabled')
    }, timeoutHelper() + 250)
})
function announceWinner(maxCount) {
    if (car1count >= maxCount) {
        alert(`Car 1 has won the game with ${maxCount} point/s!`)
        return location.reload()
    }
    else if (car2count >= maxCount) {
        alert(`Car 2 has won the game with ${maxCount} point/s!`)
        return location.reload()
    }
}