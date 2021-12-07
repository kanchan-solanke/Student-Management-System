function Login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    fetch('http://localhost:3000/LoginDetails')
        .then(response => response.json())
        .then(json => {
            var authenticate = false;
            Object.keys(json).forEach(id => {

                console.log(json[id])
                console.log(json[id].username)

                if (username == json[id].username && password == json[id].password) {
                    authenticate = true;
                }
            })
            if (authenticate == true) {
                window.location.href = "demo.html"
            } else {

                alert("Login failed please type correct username and password")

            }
        })
}

function AddRow() {


    const newPost = {
        "fname": document.getElementById("fname").value,
        "gender": document.getElementById("gender").value,
        "roll": document.getElementById("roll").value
    }
    fetch('http://localhost:3000/StudentData', writeServer('POST', newPost))
        .then(response => response.json())
        .then(json => {
            fetch('http://localhost:3000/StudentData')
                .then(response => response.json())
                .then(json => {
                    console.log("Data get", json)
                    console.log("Type of Json", typeof(json))
                    console.log(Object.values(json))
                    if (!!Object.keys(json).length) {
                        var output1 = " ";
                        Object.keys(json).forEach(id => {

                            console.log(json[id])
                            output1 += `<ul>
        <li class="list-group-item">${json[ id ].fname }</li>
        <li class="list-group-item">${json[ id ].gender }</li>

       <li class="list-group-item">${ json[ id ].roll } </li>
        </ul> `
                        })
                        listGroup.innerHTML = output1;
                    }
                });
        })

}
const listGroup = document.querySelector('.list-group');
// Gel all buttons
const getPost = document.querySelector('.get-post');
const addPost = document.querySelector('.add-post');
const editPost = document.querySelector('.edit-post');
const deletePost = document.querySelector('.delete-post');
// const url = 'http://localhost:3000/StudentData';
let output = '';
const getResponse = response => response.json();
const processJSON = json => {
    if (!!Object.keys(json).length) {
        output = ` <li class="list-group-item" data-id=${post.id}>${ json.id }
        </li><li class="list-group-item">${ json.fname }
        </li><li class="list-group-item">${ json.gender }
      </li><li class="list-group-item">${ json.roll }
        </li>`
    }
    listGroup.innerHTML = output;
}

const writeServer = (action, data) => ({
        method: action,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }

);
// GET
getPost.addEventListener('click', () => {
    fetch('http://localhost:3000/StudentData')
        .then(response => response.json())
        .then(json => {
            console.log("Data get", json)
            console.log("Type of Json", typeof(json))
            console.log(Object.values(json))
            if (!!Object.keys(json).length) {
                var output1 = " ";
                Object.keys(json).forEach(id => {

                    console.log(json[id])
                    output1 += `<ul>
        <li class="list-group-item">${json[ id ].fname }</li>
        <li class="list-group-item">${json[ id ].gender }</li>

       <li class="list-group-item">${ json[ id ].roll } </li>
        </ul>`
                })
                listGroup.innerHTML = output1;
            }
        });
});

// PUT

function validate() {
    console.log(1)
    var Id = document.getElementById("Id").value;
    var fname = document.getElementById("fname").value;
    var gender = document.getElementById("gender").value;
    var roll = document.getElementById("roll").value;

    console.log(2)


    fetch('http://localhost:3000/StudentData')
        .then(response => response.json())
        .then(json => {
            console.log("step 1")
            var first, gen, rollno;
            var updatedData = json;
            console.log("step 2")

            var storeObject = {}
            updatedData.filter((item) => {
                if (item.id == Id) {
                    first = item.fname
                    gen = item.gender
                    rollno = item.roll
                    console.log("step 3")

                    storeObject = item;
                    storeObject.fname = first; //update
                    storeObject.gender = gender; //update
                    storeObject.roll = roll; //update

                    // delete storeObject.lname //delete
                }
            })
            console.log("step 4")

            console.log(updatedData, "value get update")
            document.getElementById("fname").setAttribute('value', first);
            document.getElementById("gender").setAttribute('value', gen);
            document.getElementById("roll").setAttribute('value', rollno);


            fetch(`${'http://localhost:3000/StudentData'}/${8}`, {
                method: 'PUT',
                body: JSON.stringify(storeObject),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log("step 5")

            console.log(first, "value get")
            var authenticate = false;
            Object.keys(json).forEach(id => {
                console.log("step 6")

                console.log(json[id])
                console.log("step 7")

                console.log(Id)
                if (json[id].id == Id) {
                    authenticate = true;
                    first = json[id].fname;
                    gen = json[id].gender;
                    rollno = json[id].roll;
                }
            })
            console.log("step 8")

            if (authenticate == true) {
                console.log("step 9")

                alert("validate get id")
                alert("Update Data")
            } else {
                alert("id is not present")
            }
        })
}




function Delete() {
    console.log(1)
    var Id = document.getElementById("Id").value;
    var fname = document.getElementById("fname").value;
    var gender = document.getElementById("gender").value;
    var roll = document.getElementById("roll").value;

    console.log(2)


    fetch('http://localhost:3000/StudentData')
        .then(response => response.json())
        .then(json => {

            var first, gen, rollno;
            var updatedData = json;
            var storeObject = {}
            updatedData.filter((item) => {
                if (item.id == Id) {
                    first = item.fname
                    gen = item.gender
                    rollno = item.roll

                    storeObject = item;


                    delete storeObject.fname //delete
                    delete storeObject.gender //delete
                    delete storeObject.roll //delete

                }
            })
            console.log(updatedData, "value get update")
            document.getElementById("fname").setAttribute('value', first);
            document.getElementById("gender").setAttribute('value', gen);
            document.getElementById("roll").setAttribute('value', rollno);


            fetch(`${'http://localhost:3000/StudentData'}/${8}`, {
                method: 'delete',
                body: JSON.stringify(storeObject),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(first, "value get")
            var authenticate = false;
            Object.keys(json).forEach(id => {

                console.log(json[id])

                console.log(Id)
                if (json[id].id == Id) {
                    authenticate = true;
                    first = json[id].fname;
                    gen = json[id].gender;
                    rollno = json[id].roll;
                }
            })
            if (authenticate == true) {
                alert("Delete get id")
            } else {
                alert("id is not present")
            }
        })
}