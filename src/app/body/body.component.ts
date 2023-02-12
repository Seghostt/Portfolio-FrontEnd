import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';

export interface LoginInfo 
{
  success: boolean;
  textMod1: string;
  textMod2: string;
}


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent implements OnInit {

  constructor(private http:HttpClient) { }
  
  ngOnInit(): void 
  {
    this.registerVar = document.getElementById("Register")
    this.loginVar = document.getElementById("Login")
    this.loggedinvar = document.getElementById("loggedin")

    this.text_mod1 = document.getElementById("textMod1");
    this.text_mod2 = document.getElementById("textMod2");
  }

  private registerVar: any
  private loginVar: any
  private loggedinvar: any
  private username:any
  private password:any

  private text_mod1: HTMLElement | null = null;
  private text_mod2: HTMLElement | null = null;

  public registerSwap()
  {
    this.loginVar?.setAttribute("hidden","")
    this.registerVar?.removeAttribute("hidden")
  }
  public loginSwap()
  {
    this.registerVar?.setAttribute("hidden","")
    this.loginVar?.removeAttribute("hidden")
  }

  public logOut()
  {
    this.loginVar.removeAttribute("hidden")
    this.loggedinvar.setAttribute("hidden","")
    document.getElementById("Social-icons")?.removeAttribute("hidden")
    this.removePen()
    this.removeDelete();

    if(this.text_mod1)
      this.text_mod1.setAttribute("readonly", "true");

    if(this.text_mod2)
      this.text_mod2.setAttribute("readonly", "true");
  
    document.getElementById("deleteB")?.setAttribute("hidden","")
  }

  public PenClick()
  {
    if(this.text_mod1 == null)
      return;
    
    this.text_mod1.removeAttribute("readonly");
    this.text_mod1.removeAttribute("disabled");
  }
  
  public PenClick2()
  {
    if(this.text_mod2 == null)
      return;
    
    this.text_mod2.removeAttribute("readonly");
    this.text_mod2.removeAttribute("disabled");
  }
  public PenClick3()
  {
  }

  public sendClick()
  {
    if(this.text_mod1 == null)
      return;

    this.text_mod1.setAttribute("disabled", "");
    this.ngSubmitText(0, (this.text_mod1 as HTMLInputElement).value);
  }

  public sendClick2()
  {
    if(this.text_mod2 == null)
      return;

    this.text_mod2.setAttribute("disabled", "");
    this.ngSubmitText(1, (this.text_mod2 as HTMLInputElement).value);
  }

  public addPen()
  {
    var pens = document.getElementsByClassName("pen")
    for ( let i = 0; i< pens.length;i++)
    {
      pens[i].removeAttribute("hidden")
    }
  }
  
  addDelete()
  {
    var deletes = document.getElementsByClassName("deletes")
    for ( let i = 0; i< deletes.length;i++)
    {
      deletes[i].removeAttribute("hidden")
    }
  }

  removeDelete()
  {
    var deletes = document.getElementsByClassName("deletes")
    for ( let i = 0; i< deletes.length;i++)
    {
      deletes[i].setAttribute("hidden","")
    }
  }
  deleteObject1()
  {
    document.getElementById("content-H")?.setAttribute("hidden","")
  }
  deleteObject2()
  {
    document.getElementById("about-me1")?.setAttribute("hidden","")
  }
  deleteObject3()
  {
    document.getElementById("about-me2")?.setAttribute("hidden","")
  }

  public removePen()
  {
    var pens = document.getElementsByClassName("pen")
    for ( let i = 0; i< pens.length;i++)
    {
      pens[i].setAttribute("hidden","")
    }
  }

  public UpdateText(text_field: HTMLElement | null, text: string)
  {
    if(text_field == null)
      return;

    text_field.removeAttribute("disabled");
    text_field.textContent = text;
    text_field.setAttribute("disabled", "");
  }

  public ngLogin()
  {//modificacion de texto con base de datos y poder eliminar
    if(!this.loginForm.value.password || !this.loginForm.value.username){return}
    this.http.post<LoginInfo>("http://localhost:8080/Login",{"username":this.loginForm.value.username,"password":this.loginForm.value.password}).subscribe((res) => 
    {
      if(res.success)
      {
        this.registerVar?.setAttribute("hidden","")
        this.loginVar?.setAttribute("hidden","")
        this.loggedinvar.removeAttribute("hidden")
        document.getElementById("deleteB")?.removeAttribute("hidden")
        var welcome = document.getElementById("bienvenida")
        if(welcome != null)
        {
          welcome.innerText = "Bienvenido " + this.loginForm.value.username;
          if(this.text_mod1)
            this.text_mod1.textContent = res.textMod1;

          if(this.text_mod2)
            this.text_mod2.textContent = res.textMod2;
        }
        this.addPen()
        this.addDelete();
        document.getElementById("Social-icons")?.setAttribute("hidden","")
      }
      else
      {
        alert("username/password incorrect!");
      }
      this.username = this.loginForm.value.username
      this.password = this.loginForm.value.password
      this.loginForm.reset();
    })
  }

  public ngRegister()
  {
    this.http.post("http://localhost:8080/Register",{ "username": this.loginForm.value.username, "password": this.loginForm.value.password, "textMod1": "", "textMod2": "" }).subscribe((res) => 
    {
      this.loginForm.reset();
      if(!res)
      {
        alert("User already exists!");
      }
      else
      {
        alert("User registered\n");
        this.loginSwap();
      }
    })
  }

  public ngSubmitText(index: number, text: string)
  {
    this.http.post("http://localhost:8080/SaveChanges",{ "username": this.username, "index": index, "text": text }).subscribe((res) => 
    {
      if(res)
      {
         alert("Text Update Success");
      }
    })
  }
  loginForm = new FormGroup ({ username: new FormControl('', Validators.required), password: new FormControl('', Validators.required)})
}
