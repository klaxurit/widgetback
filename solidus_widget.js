class App {
    currentIndex = 0;
    continueBtn;
    isMobile;
    questions;
    desktopStepDisplayed;

    STEPS = [
        "Adresse",
        "Type de bien",
        "Surface",
        "Pièces",
        "Chambres",
        "Étages",
        "Année de construction",
        "DPE - GES",
        "Type de vue",
        "Orientation",
        "Annexes et commodités",
        "État du bien",
        "Votre projet 1/2",
        "Votre projet 2/2",
        "Infos de contact"
    ];

    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.init();
        this.submitHandler = this.submitHandler.bind(this);
        this.form.addEventListener('submit', this.submitHandler);
    }

    init() {
        this.updateIsMobile();
        this.initDOMElements();
        this.addEventListeners();
    
        if (!this.isMobile) {
            this.initDesktopView();
        }
    }

    initDOMElements() {
        this.questions = document.querySelectorAll(".question");
        this.continueBtn = document.querySelector(".continueBtn");
        this.continueBtn.classList.add("continue__button");
        this.progressBar = document.querySelector(".progress-bar");
        this.progression = document.querySelector(".indicator");
        this.mobileSteps = document.querySelectorAll(".mobile-steps");
    }
    
    addEventListeners() {
        this.continueBtn.addEventListener("click", (e) => this.nextHandler(e));
        this.questions[0].appendChild(this.continueBtn);
        this.handleBoxClicks();
    }
    
    initDesktopView() {
        this.progressBar.style.height = "20px";
        this.progression.style.height = "100%";
        this.questions[1].classList.remove("hidden");
        this.questions[1].classList.add("fadeInUp");
        this.mobileSteps.forEach((mobileStep, index) => {
            mobileStep.style.display = "none";
        });
    
        const firstStepLi = document.createElement("li");
        firstStepLi.className = "opacity-transition completed first-step";
        firstStepLi.style.marginBottom = "0";
        firstStepLi.innerText = this.STEPS[0];
        const stepsList = document.querySelector(".steps");
        stepsList.appendChild(firstStepLi);
    }

    updateIsMobile() {
        this.isMobile = window.innerWidth < 992;
        this.desktopStepDisplayed = false;
    }

    nextHandler(e) {
        e.preventDefault();
        // update les class du bouton
        this.continueBtn.classList.add("button-clicked")

        const isLastQuestion = this.currentIndex === this.questions.length - 1;

        // si ce n'est pas la dernière question, cache la première
        if (!isLastQuestion) {
            this.questions[this.currentIndex].classList.add("fadeOut");
        }

        setTimeout(() => {
            // si ce n'est pas la dernière question, passe la première en display none
            if (!isLastQuestion) {
                this.questions[this.currentIndex].classList.add("hidden");
            }

            // on change currentIndex pour qu'il prenne l'index de la suivante
            this.currentIndex += 1;

            // vérifiez si nous avons atteint la dernière question
            if (this.currentIndex < this.questions.length) {
                // fais appraitre la suivante
                this.questions[this.currentIndex].classList.remove("hidden", "disabled");
                this.questions[this.currentIndex].classList.add("fadeIn");


                // affiche la deuxième question si ce n'est pas un mobile
                if (!this.isMobile && this.currentIndex < this.questions.length - 1) {
                    this.questions[this.currentIndex + 1].classList.remove("hidden");
                    this.questions[this.currentIndex + 1].classList.add("fadeIn");
                }
    
                // ajoute le bouton continuer/envoyer à la question courante
                this.questions[this.currentIndex].appendChild(this.continueBtn);
            }
    
            if (this.currentIndex === this.questions.length - 1) {
                if(!this.isMobile) {
                    this.questions[this.currentIndex].style.transform = "translate(0, 50%)";
                }
                this.continueBtn.innerHTML = "Envoyer";
                this.continueBtn.classList.remove("continueBtn")
                this.continueBtn.type = "submit";
                this.continueBtn.classList.remove("button-clicked");
                this.continueBtn.removeEventListener('click', this.nextHandler);
                this.continueBtn.addEventListener('click', this.submitHandler);
            }
        
            this.updateInfos();
            if (!isLastQuestion) {
                this.continueBtn.classList.remove("button-clicked");
            }
        }, 300);
    }

    submitHandler(e) {
        e.preventDefault();
        /* this.continueBtn.classList.add("button-clicked"); */
        // Créez un objet FormData en utilisant l'élément form
        const formData = new FormData(this.form);

        // Récupérez les données du formulaire sous forme d'objet
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Affichez les données du formulaire dans la console (à des fins de test)
        console.log(data);
    }

    initStepsOnDesktop() {
        const listItems = document.querySelectorAll(".related-questions li:not(:first-child)");
        listItems.forEach(item => {
            item.classList.add("inactive");
        });
        const stepsList = document.querySelector(".steps");
        const firstStep = document.querySelector(".first-step");
        firstStep.style.marginBottom = "20px";
        this.STEPS.forEach((step, index) => {
            if (index !== 0) { // Ajoutez cette condition
                const li = document.createElement("li");
                li.innerText = step;
                li.style.opacity = 1;
                /* li.classList.add('inactive') */
                stepsList.appendChild(li);
            }
        });
        const title = document.querySelector(".title")
        const steps = document.querySelector(".related-questions");
        const sideSection = document.querySelector(".bottom-section");

        this.progressBar.style.top = "20px";
        this.progressBar.style.left = "12px";
        this.progressBar.style.height = "670px"
        title.style.position = "absolute";
        title.style.top = "15px";
        sideSection.style.bottom = "0";
        steps.style.position = "absolute";
        steps.style.top = "70px";
        steps.style.left = "20px";
        this.progression.style.height = "8%";
    }

    hideDescription() {
        if (this.currentIndex > 0) {
            document.querySelectorAll(".text").forEach((text) => {
                text.style.opacity = 0;
                setTimeout(() => {
                    text.classList.add("hidden");
                    text.style.opacity = 1;
                }, 300);
            });
        }
    }

    updateProgress() {
        switch (this.currentIndex) {
            case 2:
                this.progression.style.height = "15%";
                break;
            case 3:
                this.progression.style.height = "22%";
                break;
            case 4:
                this.progression.style.height = "30%";
                break;
            case 5:
                this.progression.style.height = "36%";
                break;
            case 6:
                this.progression.style.height = "44%";
                break;
            case 7:
                this.progression.style.height = "51%";
                break;
            case 8:
                this.progression.style.height = "57%";
                break;
            case 9:
                this.progression.style.height = "64%";
                break;
            case 10:
                this.progression.style.height = "72%";
                break;
            case 11:
                this.progression.style.height = "79%";
                break;
            case 12:
                this.progression.style.height = "86%";
                break;
            case 13:
                this.progression.style.height = "93%";
                break;
            case 14:
                this.progression.style.height = "100%";
                break;
        }
        this.updateStepBackground(this.currentIndex + 3);
    }

    getNewBackgroundImage() {
        return 'url("data:image/svg+xml,%3Csvg width=\'62\' height=\'63\' viewBox=\'0 0 62 63\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'31\' cy=\'31.5\' r=\'28\' fill=\'%23192F21\' stroke=\'white\' stroke-width=\'6\'/%3E%3C/svg%3E")';
    }

    updateStepBackground(stepIndex) {
        const listItems = document.querySelectorAll(".related-questions li:not(:first-child)");
    
        listItems.forEach((item, index) => {
            if (index < stepIndex) {
                item.classList.remove("inactive");
                item.classList.add("completed");
            } else {
                item.classList.remove("completed");
                item.classList.add("inactive");
            }
        });
    }

    updateInfos() {
        this.hideDescription()
        if (this.currentIndex === 1 && !this.isMobile && !this.desktopStepDisplayed) {
            this.desktopStepDisplayed = true;
            this.initStepsOnDesktop();
        }
        if (!this.isMobile) {
            this.updateProgress()
        }
        const visibleSteps = document.querySelectorAll(".related-questions li");
        visibleSteps.forEach((step, i) => {
            let stepIndex = this.currentIndex + i;
            if (!this.isMobile && this.currentIndex === 1) {
                step.style.opacity = 1;
                step.classList.remove("hidden");
            }
            
            if (this.isMobile) {
                if (stepIndex < this.STEPS.length) {
                    step.style.opacity = 0;
                    setTimeout(() => {
                        step.innerHTML = this.STEPS[stepIndex];
                        step.className = i === 0 ? 'active' : 'inactive';
                        step.classList.add("opacity-transition");
                        step.style.opacity = i === 0 ? 1 : 0.5;
                    }, 300);
                } else {
                    step.style.opacity = 0;
                    setTimeout(() => {
                        step.style.display = "none";
                    }, 300);
                }
            } 
        });
    }

    handleBoxClicks() {
        document.querySelectorAll(".box").forEach((box) => {
            box.addEventListener("click", (event) => {
                const radio = box.previousElementSibling;
                radio.checked = !radio.checked;
                const houseFields = document.querySelectorAll(".house");
                const apartmentFields = document.querySelectorAll(".apartment");
    
                if (radio.value === "apartment") {
                    apartmentFields.forEach((apartment) => {
                        apartment.classList.remove("hidden");
                    })
                    houseFields.forEach((house) => {
                        house.classList.add("hidden");
                    })
                } else if (radio.value === "house") {
                    apartmentFields.forEach((apartment) => {
                        apartment.classList.add("hidden");
                    })
                    houseFields.forEach((house) => {
                        house.classList.remove("hidden");
                    })
                }
            });
        });
    }

    incrementField(fieldName) {
        const fieldInput = document.getElementById(fieldName);
        const currentValue = parseInt(fieldInput.value);
        if (currentValue < fieldInput.max) {
            fieldInput.value = currentValue + 1;
        }
    }

    decrementField(fieldName) {
        const fieldInput = document.getElementById(fieldName);
        const currentValue = parseInt(fieldInput.value);
        if (currentValue > fieldInput.min) {
            fieldInput.value = currentValue - 1;
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    (function () {
        const app = new App('#solidus');
        window.app = app;
    })();
});