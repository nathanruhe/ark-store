import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {

  loading = false;
  success = false;
  cooldown = false;

  reveal = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor(private fb: FormBuilder) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.reveal = true;
    }, 150);
  }

  send(): void {

    if (this.form.invalid || this.loading || this.cooldown) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    emailjs.send(
      'service_4dzcbls',
      'template_ju3tcdb',
      {
        from_name: this.form.value.name,
        from_email: this.form.value.email,
        message: this.form.value.message?.trim(),
        timestamp: new Date().toLocaleString('es-ES')
      },
      'tSE-9Ni4bCD_fadCR'
    )
    .then(() => {

      this.loading = false;
      this.success = true;
      this.cooldown = true;

      this.form.reset();

      setTimeout(() => {
        this.success = false;
      }, 3000);

      setTimeout(() => {
        this.cooldown = false;
      }, 6000);

    })
    .catch((error) => {

      console.error('EMAILJS ERROR:', error);

      this.loading = false;

      alert(
        'No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.'
      );

    });
  }

  get f() {
    return this.form.controls;
  }
}