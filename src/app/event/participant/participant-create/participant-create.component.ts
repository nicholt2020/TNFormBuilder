import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioAuthService } from 'angular-formio/auth';
import {
  FormioResourceCreateComponent,
  FormioResourceService,
  FormioResourceConfig
} from 'angular-formio/resource';

const FormioUtils = require('formiojs/utils');

@Component({
  selector: 'app-participant-create',
  templateUrl: './participant-create.component.html',
  styleUrls: ['./participant-create.component.scss']
})
export class ParticipantCreateComponent extends FormioResourceCreateComponent implements OnInit {
    constructor(
    public service: FormioResourceService,
    public route: ActivatedRoute,
    public router: Router,
    public config: FormioResourceConfig,
    public auth: FormioAuthService
  ) {
    super(service, route, router, config);
  }

    ngOnInit() {
        super.ngOnInit();

        this.service.resources['event'].resourceLoaded.then((event) => {
            this.service.formLoaded.then((form) => {
                if (event.data.registrationForm) {
                const registerForm = FormioUtils.getComponent(form.components, 'registration', true);
                registerForm.src = this.service.formFormio.projectUrl + '/' + event.data.registrationForm;
                }
                this.auth.userReady.then((user) => {
                    this.service.resource.data.registration = {data: user.data};
                    this.service.refresh.emit({
                        property: 'submission',
                        value: this.service.resource
                    });
                });
            });
        });
    }
}