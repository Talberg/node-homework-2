const method = require('./generateHTML')
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer")
var pdf = require('html-pdf');

var options = { format: 'Letter' };
const questions = [
    {
        type: "input",
        name: "username",
        message: "What is your gitHub Username?"
    },
    {
        type: "list",
        name: "color",
        message: "What is your favorite color?",
        choices: ["green","pink","blue","red"]

    },
    

];

// console.log(newPage)
inquirer
    .prompt(questions)
    .then(function({color,username}){
        const newPage = method.generateHTML(color)
        // console.log(newPage)
        axios
        .get( `https://api.github.com/users/${username}`)
        .then(({data})=> {
            let name = data.name
            let imgSrc = data.avatar_url
            let email = data.blog
            let repos = data.public_repos
            let followers = data.followers
            let following = data.following
            let bio = data.bio
            let gitHub = data.html_url
            axios.get(`https://api.github.com/users/${username}/starred`)
            .then(({data})=>{
                let star = data.length
                 let html = method.generateHTML(color,name,imgSrc,bio,gitHub,email,repos,followers,following,star)

                  pdf.create(html, options).toFile('./HTML.pdf', function(err, res) {
                if (err) return console.log(err);
                console.log(res); 
              });
            })

           

           
        }
        
    )
   
  






}

    )
