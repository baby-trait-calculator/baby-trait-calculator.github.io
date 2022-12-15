document.getElementById("calculate").addEventListener("click", function() {
    calculateTraits();
});

function setInputFilter(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function(event) {
      textbox.addEventListener(event, function(e) {
        if (inputFilter(this.value)) {
            
          // Accepted value
          if (["keydown","mousedown","focusout"].indexOf(e.type) >= 0){
            this.classList.remove("input-error");
            this.setCustomValidity("");
          }
          if (this.value < 18 && this.value.toString().length > 1) {
            this.classList.add("input-error");
            this.setCustomValidity("The age must be 18 or over");
            this.reportValidity();
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            return;
          }
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          // Rejected value - restore the previous one
          this.classList.add("input-error");
          if (isNaN(this.value)) {
            this.setCustomValidity("The box must only have numbers");
          }
           else {
            this.setCustomValidity(errMsg);
          }
          this.reportValidity()
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          // Rejected value - nothing to restore
          this.value = "";
        }
      });
    });
  }

setInputFilter(document.getElementById("concievment_age"), function(value) {
return value <= 45}, "The calculator only supports ages 18 to 45.");



let genderDeterminations = {

"january": [
    '18', '20', '22', '25', '27', '29', '33', '36', '38', '40', '42', '45'
  ],
  "february": [
    '19', '21', '24', '26', '28', '30', '31', '32', '34', '37', '39', '41', '43'
  ],
  "march": [
    '18', '20', '21', '23', '27', '29', '30', '33', '35', '38', '40', '42', '44'
  ],
  "april": [
    '19', '21', '22', '25', '26', '28', '29', '30', '31', '32', '33', '34', '36',
    '41', '43', '45'
  ],
  "may": [
    '19', '21', '24', '25', '26', '27', '28', '30', '31', '32', '33', '34', '35',
    '37', '40', '42', '45'
  ],
  "june": [
    '21', '22', '23', '27', '28', '30', '31', '32', '33', '34', '35', '36', '38',
    '39', '41', '43', '45'
  ],
  "july": [
    '21', '22', '25', '26', '30', '31', '32', '33', '34', '35', '36', '37', '39',
    '42', '44'
  ],
  "august": [
    '21', '23', '24', '30', '31', '32', '34', '36', '38', '40', '43', '45'
  ],
  "september": [
    '21', '22', '24', '26', '30', '31', '32', '33', '34', '35', '37', '39', '41',
    '44'
  ],
  "october": [
    '20', '21', '22', '24', '26', '29', '30', '31', '32', '33', '34', '35', '38',
    '40', '42', '45'
  ],
  "november": [
    '19', '21', '22', '24', '26', '27', '28', '29', '31', '32', '33', '37', '39',
    '41', '44'
  ],
  "december": [
    '19', '21', '22', '23', '24', '26', '28', '29', '37', '38', '39', '40', '42',
    '44'
  ]
}


let eyeColorResponses = {
    "blue": {
        "brown" : "Your baby's eye color will most likely be brown, with a slight chance of blue.",
        "blue": "Your baby's eye color will almost certainly be blue, with a 1% chance of green.",
        "green": "Your baby's eye color will either be blue or green.",
    },
    "brown": {
        "blue": "Your baby's eye color will either be blue or brown.",
        "brown": "Your baby's eye color will most likely be brown, with a slight chance of green or blue.",
        "green": "Your baby's eye color will most likely be brown or green, there is also a slight chance of blue."
    },
    "green": {
        "brown": "Your baby's eye color will most likely be brown or green, there is also a slight chance of blue.",
        "blue": "Your baby's eye color will either be blue or green.",
        "green": "Your baby's eye color will most likely be green with a chance of blue and near non-existent chance of brown."
    }
}

let hairColorResponses = {
    "blonde": {
        "black": "Your baby's hair will most likely be black, especially if blonde/red hair runs in one of the parent's families.",
        "blonde" : "Your baby's hair will almost certainly be blonde.",
        "red": "Your baby's hair will almost certainly be blonde.",
        "brown": "Your baby's hair will most likely be brown (75%) with a chance of blonde hair (25%)."
    },
    "brown": {
        "brown": "Your baby's hair color will almost certainly be black, with a very slim chance of red or blonde hair. (This is only if blonde/red hair runs in both parents' families.)",
        "red" : "Your baby's hair will most likely be brown (75%) with a chance of red hair (25%).",
        "blonde": "Your baby's hair will most likely be brown (75%) with a chance of blonde hair (25%).",
        "black": "Your baby's hair will most likely be brown (75%) with a slight chance of black hair (25%)."

    },
    "black": {
        "black": "Your baby's hair color will almost certainly be black, with a very slim chance of red or blonde hair. (This is only if blonde/red hair runs in both parents' families.)",
        "red": "Your baby's hair will most likely be black (75%) with a chance of red hair (25%).",
        "blonde": "Your baby's hair will most likely be black (75%), with a chance of blonde or red hair.",
        "brown": "Your baby's hair will most likely be brown (75%) with a slight chance of black hair (25%)."
    },
    "red": {
        "black": "Your baby's hair will most likely be black (75%) with a chance of red hair (25%).",
        "red": "Your baby will almost certainly have red hair.",
        "blonde": "Your baby's hair will almost certainly be blonde.",
        "brown": "Your baby's hair will most likely be brown (75%) with a chance of red hair (25%)."
    }

}

let hairTypeResponses = {
    "straight": {
        "curly": "Your baby's hair type will most likely be wavy hair, as a curly allele combined with a straight allele will lead to wavy hair.",
        "wavy": "Your baby has a 50/50 chance of having either straight OR wavy hair",
        "straight": "Your baby's hair type will be straight."
    },
    "curly": {
        "curly": "Your baby's hair type will certainly be curly.",
        "wavy": "Your baby will have a 50/50 chance of curly hair OR wavy hair.",
        "straight": "Your baby's hair type will most likely be wavy hair, as a curly allele combined with a straight allele will lead to wavy hair."
    },
    "wavy": {
        "curly": "Your baby will have a 50/50 chance of curly hair OR wavy hair.",
        "wavy": "Your baby's hair type will almost certainly be wavy.",
        "straight": "Your baby has a 50/50 chance of having either straight OR wavy hair"
    }
}

let chinTypeResponses = {
    "cleft": {
        "cleft": "Your baby will most likely have a cleft chin. There is also a small chance that your baby will have a smooth chin.",
        "smooth":"Your baby will certainly have a cleft chin." 
    },
    "smooth": {
        "cleft": "Your baby will certainly have a cleft chin.",
        "smooth":"Your baby will almost certainly have a smooth chin."
    }
}


function calculateTraits() {
    if (document.getElementById("concievment_age").value == "" || isNaN(document.getElementById("concievment_age").value)) {
        window.scrollTo(0, 0);
        setTimeout(function() {
            document.getElementById("concievment_age").classList.add("input-error");
            document.getElementById("concievment_age").setCustomValidity("Please enter a valid age.");
            document.getElementById("concievment_age").reportValidity();
        }, 500);
        return;
    }
    else if (document.getElementById("concievment_age").value < 18) {
        window.scrollTo(0, 0);
        setTimeout(function() {
            document.getElementById("concievment_age").classList.add("input-error");
            document.getElementById("concievment_age").setCustomValidity("The age must be 18 or over.");
            document.getElementById("concievment_age").reportValidity();
        }, 500);
        return;
    } 
    let hairColorResponse = calculateHairColor()
    let genderResponse = calculateGender()
    let eyeColorResponse = calculateEyeColor()
    let dominantHandResponse = calculateDominantHand()
    let hairTypeResponse = calculateHairType()
    let chinTypeResponse = calculateChinType()
    let dimplesResponse = calculateDimples()
    let frecklesResponse = calculateFreckles()
    document.querySelector(".data-container").classList.add("hidden")
    document.querySelector(".response-container").classList.remove("hidden")
    document.querySelector(".response-container").innerHTML = `
        <h3>Results:</h3>
        <h4>${genderResponse}</h4>
        <h4>${eyeColorResponse}</h4>
        <h4>${hairColorResponse}</h4>
        <h4>${hairTypeResponse}</h4>
        <h4>${dominantHandResponse}</h4>
        <h4>${chinTypeResponse}</h4>
        <h4>${dimplesResponse}</h4>
        <h4>${frecklesResponse}</h4>
        
        <h5>Keep in mind that these are only estimates, and that the baby\'s traits may not be exactly the same as what is predicted.</h5>
    `
    var back_btn = document.createElement("button");
    back_btn.classList = 'btn btn-success';
    back_btn.innerHTML = "Back";
    back_btn.onclick = function() {
        window.location.reload();
    }
    document.querySelector(".response-container").appendChild(back_btn);
    

}

function calculateGender() {
    var month = document.getElementById("concievment_month").value
    var age = document.getElementById("concievment_age").value
    return genderDeterminations[month].includes(age) ? "Your baby will be a girl." : "Your baby will be a boy."
}

function calculateFreckles() {
    var motherFreckles = document.getElementById("freckles-mother").checked
    var fatherFreckles = document.getElementById("freckles-father").checked

    if (motherFreckles && fatherFreckles) return "Your baby will certainly have freckles."
    else if (motherFreckles && !fatherFreckles) return "Your baby will very likely (75%) have freckles."
    else if (!motherFreckles && fatherFreckles) return "Your baby will very likely (75%) have freckles."
    else return "Your baby will not have freckles."
}

function calculateChinType() {
    var motherChin = document.getElementById("chin_type_mother").value
    var fatherChin = document.getElementById("chin_type_father").value
    return chinTypeResponses[motherChin][fatherChin]
}

function calculateDimples() {
    var motherDimples = document.getElementById("dimples-mother").checked
    var fatherDimples = document.getElementById("dimples-father").checked

    if (motherDimples && fatherDimples) return "Your baby will likely (75-100%) have dimples."
    else if (motherDimples && !fatherDimples) return "Your baby will have a 50/50 chance of having dimples."
    else if (!motherDimples && fatherDimples) return "Your baby will have a 50/50 chance of having dimples."
    else return "Your baby will likely not (0-1%) have dimples."
}

function calculateHairColor() {
    var motherHair = document.getElementById("hair_color_mother").value
    var fatherHair = document.getElementById("hair_color_father").value
    return hairColorResponses[motherHair][fatherHair]
}

function calculateDominantHand() {
    var motherHand = document.getElementById("dominant_hand_mother").value
    var fatherHand = document.getElementById("dominant_hand_father").value
    if (motherHand == "right" && fatherHand == "right") return "Your baby's dominant hand will most likely (90-100%) be their right hand."
    else return "Your baby's dominant hand will likely (60%) still be right-handed."

}


function calculateEyeColor() {
    var motherEye = document.getElementById("eye_color_mother").value
    var fatherEye = document.getElementById("eye_color_father").value
    return eyeColorResponses[motherEye][fatherEye]
}

function calculateHairType() {
    var motherHair = document.getElementById("hair_type_mother").value
    var fatherHair = document.getElementById("hair_type_father").value
    return hairTypeResponses[motherHair][fatherHair]
}