import { AlunoService } from './../aluno.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {
  alunos: Aluno[] = [];
  nome!:string;


  constructor(private alunoService: AlunoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAlunos();
}

  getAlunos(): void {
    this.alunoService.getAlunos()
    .subscribe(alunos => this.alunos = alunos);
  }

  add(nome: string): void {
    nome = this.nome.trim();
    if (!nome) { return; }
    this.alunoService.addAluno({ nome } as Aluno)
      .subscribe(aluno => {
        this.alunos.push(aluno);
      });
  }

  delete(aluno: Aluno): void {
    this.alunos = this.alunos.filter(a => a !== aluno);
    this.alunoService.deleteAluno(aluno.id).subscribe();
  }

}
