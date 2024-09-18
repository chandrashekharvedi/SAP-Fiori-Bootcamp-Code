function aynchProcess() {
    // Asynchronous Behaviour
    // alert("before waiting");
    // setTimeout(5000);
    // alert("after waiting");
    
    // Synchronous Behaviour
    alert("before waiting");
    setTimeout(function() {
        alert("after waiting");
    }, 5000);
}

function spiderman() {
    // Step 1: read the value of input fields
    let oUser = document.getElementById("idUserName");
    let sUserValue = oUser.value;
    // Step 2: read the value of password field
    // Chaining is JavaScript
    let sPwd = document.getElementById("idPwd").value;

    // step 3: compare the values using if
    if (sUserValue === "Shekhar" && sPwd == "demo@111") {
        // Step 4: Login Success
        alert("Login Successfull");
    }else {
        // Step 4: Login failed show error
        // alert("Login Failed");
        document.getElementById("msg").innerText = "The login has failed";
    }
}

function onMagic() {
    // step 1: get the object of html elements using class name
    let aBoxes = document.getElementsByClassName("box-content");
    // step 2: loop over the elements
    for (let i = 0; i < aBoxes.length; i++) {
        let item = aBoxes[i];
        item.style.background = "red";
        item.style.color = "white";
        item.style.fontWeight = "bold";
        
    }
}

function addContent() {
    // Step 1: Create a brand new html element object
    let oNewElement = document.createElement("h3");
    // Step 2: create a text node
    let oTextNode = document.createTextNode(document.getElementById("idSuper").value);
    // Step 3: add text node to newly created element
    oNewElement.appendChild(oTextNode);
    // Step 4: get the container object
    let oContainer = document.getElementById("idContent");
    // Step 5: add the newly create element to container
    oContainer.appendChild(oNewElement);
}

function onHide() {
    // $(".box").hide();

    var flag = true;
    $(".box").fadeOut(3000, function() {
        if (flag) {
            alert("hide is completed");
            flag = false;
        }
    })
}

function onShow() {
    // $(".box").show();
    $(".box").fadeIn(3000);
}