import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor(private http:HttpClient) { }
  
  ngOnInit(): void {
    this.registerVar = document.getElementById("Register")
    this.loginVar = document.getElementById("Login")
    this.loggedinvar = document.getElementById("loggedin")
  }

  private registerVar: any
  private loginVar: any
  private loggedinvar: any
  private username:any
  private password:any
  public registerSwap(){
    this.loginVar?.setAttribute("hidden","")
    this.registerVar?.removeAttribute("hidden")

  }
  public loginSwap(){
    this.registerVar?.setAttribute("hidden","")
    this.loginVar?.removeAttribute("hidden")
  }

  public logOut(){
    this.loginVar.removeAttribute("hidden")
    this.loggedinvar.setAttribute("hidden","")
    document.getElementById("Social-icons")?.removeAttribute("hidden")
    this.removePen()
    this.removeDelete();
    document.getElementById("textMod")?.setAttribute("readonly","true")
    document.getElementById("textMod2")?.setAttribute("readonly","true")
    document.getElementById("deleteB")?.setAttribute("hidden","")
  }

  public PenClick(){
    document.getElementById("textMod")?.removeAttribute("disabled")
  }
  
  public PenClick2(){
    document.getElementById("textMod2")?.removeAttribute("disabled")
  }
  public PenClick3(){
  }

  public sendClick(){
    document.getElementById("textMod")?.setAttribute("disabled","")
    this.ngSubmitText()
  }

  public sendClick2(){
    document.getElementById("textMod2")?.setAttribute("disabled","")
    this.ngSubmitText()
  }

  public addPen(){
    var pens = document.getElementsByClassName("pen")
    for ( let i = 0; i< pens.length;i++){
      pens[i].removeAttribute("hidden")
    }
  }
  
  addDelete(){
    var deletes = document.getElementsByClassName("deletes")
    for ( let i = 0; i< deletes.length;i++){
      deletes[i].removeAttribute("hidden")
    }
  }

  removeDelete(){
    var deletes = document.getElementsByClassName("deletes")
    for ( let i = 0; i< deletes.length;i++){
      deletes[i].setAttribute("hidden","")
    }
  }
  deleteObject1(){
    document.getElementById("content-H")?.setAttribute("hidden","")
  }
  deleteObject2(){
    
    document.getElementById("about-me1")?.setAttribute("hidden","")
  }
  deleteObject3(){
    
    document.getElementById("about-me2")?.setAttribute("hidden","")
  }

  public removePen(){
    var pens = document.getElementsByClassName("pen")
    for ( let i = 0; i< pens.length;i++){
      pens[i].setAttribute("hidden","")
    }
  }


  public ngLogin(){//modificacion de texto con base de datos y poder eliminar
    if(!this.loginForm.value.password || !this.loginForm.value.username){return}
    this.http.post("http://localhost:8080/Login",{"username":this.loginForm.value.username,"password":this.loginForm.value.password}).subscribe((res) => 
    {

      if(res){
        this.registerVar?.setAttribute("hidden","")
        this.loginVar?.setAttribute("hidden","")
        this.loggedinvar.removeAttribute("hidden")
        document.getElementById("deleteB")?.removeAttribute("hidden")
        var welcome = document.getElementById("bienvenida")
        if(welcome !=null){
          welcome.innerText = "Bienvenido " + this.loginForm.value.username
        }
        this.addPen()
        this.addDelete();
        document.getElementById("Social-icons")?.setAttribute("hidden","")
      }
      this.username = this.loginForm.value.username
      this.password = this.loginForm.value.password
      this.loginForm.reset();
    })  
  }

  public ngRegister(){
    this.http.post("http://localhost:8080/Register",{"username":this.loginForm.value.username,"password":this.loginForm.value.password}).subscribe((res) => 
    {
      this.loginForm.reset();
      
    })  
  }


  public ngSubmitText(){
    this.http.post("http://localhost:8080/SaveChanges",{"username":this.username,"password":this.password,"Textmod":document.getElementById("textMod")?.textContent,"Textmod2":document.getElementById("TextMod2")?.textContent}).subscribe((res) => 
    {
      console.log(document.getElementById("textMod")?.textContent)
    })  
  }

  loginForm = new FormGroup   ({       username: new FormControl('', Validators.required),       password: new FormControl('', Validators.required)   })
  textForm = new FormGroup ({textMod : new FormControl(''), textMod2 : new FormControl('')})
}
