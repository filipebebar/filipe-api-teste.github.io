import {Component, OnInit} from '@angular/core';
import {ApiBackendService} from './service/api-backend.service';
import {NotifierService} from 'angular-notifier';
import {Pessoa} from './service/pessoa';
import {Contato} from './service/contato';
import {Validators} from '@angular/forms';
import * as $ from 'jquery';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private readonly notifier: NotifierService;
  pessoa: Pessoa = new Pessoa();
  contato: Contato = new Contato();

  pessoas: Pessoa;
  contatos: Contato;

  showAddContato = false;
  editingContato = false;
  contatoList: any;


  constructor(private pessoaService: ApiBackendService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.listarPessoas();
  }

  // tslint:disable-next-line:typedef
  listarPessoas() {
    this.pessoaService.listAll().subscribe(pessoaList => {
      this.pessoas = pessoaList;
    }, error => {
      console.log('Erro ao listar pessoas');
    });
  }

  // tslint:disable-next-line:typedef
  salvar() {
    if (!this.pessoa.id) {
      this.pessoa.contatos = this.contatoList;
      this.pessoaService.save(this.pessoa).subscribe(pessoa => {
        this.listarPessoas();
      }, error => {
        console.log('Erro ao cadastrar');
      });
    } else {
      this.pessoa.contatos = this.contatoList;
      this.pessoaService.atualizar(this.pessoa).subscribe(pessoa => {
        this.listarPessoas();
      }, error => {
        console.log('Erro ao Atualizar');
      });
    }

  }

  // tslint:disable-next-line:typedef
  addContato() {
    this.showAddContato = true;
  }

  // tslint:disable-next-line:typedef
  salvarContato() {
    this.contatoList = new Array();
    this.contatoList.push(this.contato);
  }

  // tslint:disable-next-line:typedef
  cancelarAddContato() {
    this.showAddContato = false;
  }

  // tslint:disable-next-line:typedef
  mostrarContatos(contatos) {
    this.contatoList = contatos;
  }

  // tslint:disable-next-line:typedef
  fecharContatos() {
    this.contatoList = null;
  }

  // tslint:disable-next-line:typedef
  editarPessoa(pessoa) {
    this.pessoa = pessoa;
    this.editingContato = true;
  }

  // tslint:disable-next-line:typedef
  cancelarEdicao() {
    this.editingContato = false;
  }

  // tslint:disable-next-line:typedef
  deletarPessoa(pessoa) {
    this.pessoaService.deletar(pessoa.id).subscribe({
      next: (response) => this.listarPessoas()
    });
  }

  // tslint:disable-next-line:typedef
  deletarContato(contato) {
    this.contatoList.pop(contato.index);
  }

  // tslint:disable-next-line:typedef
  validateEmail(email) {
    console.log(email);
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }

}
