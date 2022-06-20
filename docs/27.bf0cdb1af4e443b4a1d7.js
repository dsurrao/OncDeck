(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{"7wfR":function(n,l,u){"use strict";u.d(l,"a",(function(){return a}));var e=u("dYYQ"),t=u("CcnG"),a=function(){function n(n){this.dbSvc=n}return n.prototype.getPatient=function(n){return this.dbSvc.getDocument(n)},n.prototype.savePatient=function(n){return this.dbSvc.savePatient(n)},n.prototype.removePatient=function(n){return this.dbSvc.removePatient(n)},n.prototype.watchPatient=function(n,l){return null==n.watchers&&(n.watchers=[]),-1==n.watchers.indexOf(l)&&n.watchers.push(l),this.savePatient(n)},n.prototype.unWatchPatient=function(n,l){if(null!=n.watchers){var u=n.watchers.indexOf(l);-1!=u&&n.watchers.splice(u,1)}return this.savePatient(n)},n.prototype.notScheduled=function(n){return!this.scheduledForBiopsy(n)&&!this.scheduledForSurgery(n)},n.prototype.scheduledForBiopsy=function(n){var l=!1;return null!=n.biopsy&&null!=n.biopsy.scheduledBiopsy&&n.biopsy.scheduledBiopsy.scheduledDate>=(new Date).toISOString()&&(l=!0),l},n.prototype.scheduledForSurgery=function(n){var l=!1;return null!=n.surgery&&null!=n.surgery.scheduledSurgery&&n.surgery.scheduledSurgery.scheduledDate>=(new Date).toISOString()&&(l=!0),l},n.ngInjectableDef=t.S({factory:function(){return new n(t.W(e.a))},token:n,providedIn:"root"}),n}()},Qovr:function(n,l,u){"use strict";u.r(l);var e=u("CcnG"),t=u("mrSG"),a=u("ZZ/e"),i=u("7wfR"),o=u("6ydw"),r=u("DL2O"),b=function(){function n(n,l,u,e,t,a){this.navCtrl=n,this.patientSvc=l,this.events=u,this.alertController=e,this.route=t,this.dateUtils=a,this.patient=new o.a}return n.prototype.ngOnInit=function(){var n=this;this.patientId=this.route.snapshot.paramMap.get("id"),null!=this.patientId&&this.patientSvc.getPatient(this.patientId).then((function(l){n.patient=l}))},n.prototype.ionViewDidEnter=function(){this.originalFormGroupValue=this.patientForm.value},n.prototype.submit=function(){var n=this;null==this.patient._id&&(this.patient._id=this.dateUtils.generateUniqueId()),this.patientSvc.savePatient(this.patient).then((function(l){console.log("patient saved"),n.events.publish("patientSaved"),n.navCtrl.navigateBack("/patients")})).catch((function(l){n.showPatientSaveError(l)}))},n.prototype.submitAndNext=function(){var n=this;this.savePatient().then((function(l){console.log("patient saved"),n.events.publish("patientSaved"),n.navCtrl.navigateForward("/patient/"+n.patient._id+"/biopsy")})).catch((function(l){n.showPatientSaveError(l)}))},n.prototype.savePatient=function(){return null==this.patient._id&&(this.patient._id=this.dateUtils.generateUniqueId()),this.patientSvc.savePatient(this.patient)},n.prototype.showPatientSaveError=function(n){var l;l="409"==n.status?"This patient's data was updated by somewhere else; please refresh data via the home page":n,this.patientForm.reset(this.originalFormGroupValue),this.showAlert("Error saving patient",l)},n.prototype.showAlert=function(n,l){return t.b(this,void 0,void 0,(function(){return t.e(this,(function(u){switch(u.label){case 0:return[4,this.alertController.create({message:n,subHeader:l,buttons:["OK"]})];case 1:return[4,u.sent().present()];case 2:return u.sent(),[2]}}))}))},n}(),s=function(){return function(){}}(),d=u("pMnS"),g=u("oBZk"),p=u("gIcY"),h=u("ZYCi"),c=e.nb({encapsulation:0,styles:[[""]],data:{}});function m(n){return e.Jb(0,[e.Fb(402653184,1,{patientForm:0}),(n()(),e.pb(1,0,null,null,11,"ion-header",[],null,null,null,g.eb,g.o)),e.ob(2,49152,null,0,a.D,[e.h,e.k,e.z],null,null),(n()(),e.pb(3,0,null,0,9,"ion-toolbar",[],null,null,null,g.Fb,g.P)),e.ob(4,49152,null,0,a.Eb,[e.h,e.k,e.z],null,null),(n()(),e.pb(5,0,null,0,2,"ion-title",[],null,null,null,g.Db,g.N)),e.ob(6,49152,null,0,a.Cb,[e.h,e.k,e.z],null,null),(n()(),e.Hb(-1,0,["Patient Form"])),(n()(),e.pb(8,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,g.U,g.e)),e.ob(9,49152,null,0,a.n,[e.h,e.k,e.z],null,null),(n()(),e.pb(10,0,null,0,2,"ion-back-button",[],null,[[null,"click"]],(function(n,l,u){var t=!0;return"click"===l&&(t=!1!==e.zb(n,12).onClick(u)&&t),t}),g.S,g.c)),e.ob(11,49152,null,0,a.i,[e.h,e.k,e.z],null,null),e.ob(12,16384,null,0,a.j,[[2,a.kb],a.Kb],null,null),(n()(),e.pb(13,0,null,null,148,"ion-content",[],null,null,null,g.Z,g.j)),e.ob(14,49152,null,0,a.w,[e.h,e.k,e.z],null,null),(n()(),e.pb(15,0,null,0,146,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],(function(n,l,u){var t=!0,a=n.component;return"submit"===l&&(t=!1!==e.zb(n,17).onSubmit(u)&&t),"reset"===l&&(t=!1!==e.zb(n,17).onReset()&&t),"ngSubmit"===l&&(t=!1!==a.submit()&&t),t}),null,null)),e.ob(16,16384,null,0,p.l,[],null,null),e.ob(17,4210688,[[1,4],["patientForm",4]],0,p.h,[[8,null],[8,null]],null,{ngSubmit:"ngSubmit"}),e.Eb(2048,null,p.a,null,[p.h]),e.ob(19,16384,null,0,p.g,[[4,p.a]],null,null),(n()(),e.pb(20,0,null,null,13,"ion-item",[],null,null,null,g.ob,g.t)),e.ob(21,49152,null,0,a.J,[e.h,e.k,e.z],null,null),(n()(),e.pb(22,0,null,0,2,"ion-label",[["floating",""]],null,null,null,g.pb,g.z)),e.ob(23,49152,null,0,a.P,[e.h,e.k,e.z],null,null),(n()(),e.Hb(-1,0,["First Name"])),(n()(),e.pb(25,0,null,0,8,"ion-input",[["name","firstName"],["required",""],["type","text"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,u){var t=!0,a=n.component;return"ionBlur"===l&&(t=!1!==e.zb(n,28)._handleBlurEvent(u.target)&&t),"ionChange"===l&&(t=!1!==e.zb(n,28)._handleInputEvent(u.target)&&t),"ngModelChange"===l&&(t=!1!==(a.patient.firstName=u)&&t),t}),g.ib,g.s)),e.ob(26,16384,null,0,p.j,[],{required:[0,"required"]},null),e.Eb(1024,null,p.c,(function(n){return[n]}),[p.j]),e.ob(28,16384,null,0,a.Sb,[e.k],null,null),e.Eb(1024,null,p.d,(function(n){return[n]}),[a.Sb]),e.ob(30,671744,null,0,p.i,[[2,p.a],[6,p.c],[8,null],[6,p.d]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Eb(2048,null,p.e,null,[p.i]),e.ob(32,16384,null,0,p.f,[[4,p.e]],null,null),e.ob(33,49152,null,0,a.I,[e.h,e.k,e.z],{name:[0,"name"],required:[1,"required"],type:[2,"type"]},null),(n()(),e.pb(34,0,null,null,13,"ion-item",[],null,null,null,g.ob,g.t)),e.ob(35,49152,null,0,a.J,[e.h,e.k,e.z],null,null),(n()(),e.pb(36,0,null,0,2,"ion-label",[["floating",""]],null,null,null,g.pb,g.z)),e.ob(37,49152,null,0,a.P,[e.h,e.k,e.z],null,null),(n()(),e.Hb(-1,0,["Last Name"])),(n()(),e.pb(39,0,null,0,8,"ion-input",[["name","lastName"],["required",""],["type","text"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,u){var t=!0,a=n.component;return"ionBlur"===l&&(t=!1!==e.zb(n,42)._handleBlurEvent(u.target)&&t),"ionChange"===l&&(t=!1!==e.zb(n,42)._handleInputEvent(u.target)&&t),"ngModelChange"===l&&(t=!1!==(a.patient.lastName=u)&&t),t}),g.ib,g.s)),e.ob(40,16384,null,0,p.j,[],{required:[0,"required"]},null),e.Eb(1024,null,p.c,(function(n){return[n]}),[p.j]),e.ob(42,16384,null,0,a.Sb,[e.k],null,null),e.Eb(1024,null,p.d,(function(n){return[n]}),[a.Sb]),e.ob(44,671744,null,0,p.i,[[2,p.a],[6,p.c],[8,null],[6,p.d]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Eb(2048,null,p.e,null,[p.i]),e.ob(46,16384,null,0,p.f,[[4,p.e]],null,null),e.ob(47,49152,null,0,a.I,[e.h,e.k,e.z],{name:[0,"name"],required:[1,"required"],type:[2,"type"]},null),(n()(),e.pb(48,0,null,null,13,"ion-item",[],null,null,null,g.ob,g.t)),e.ob(49,49152,null,0,a.J,[e.h,e.k,e.z],null,null),(n()(),e.pb(50,0,null,0,2,"ion-label",[],null,null,null,g.pb,g.z)),e.ob(51,49152,null,0,a.P,[e.h,e.k,e.z],null,null),(n()(),e.Hb(-1,0,["DOB"])),(n()(),e.pb(53,0,null,0,8,"ion-datetime",[["name","dob"],["required",""]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,u){var t=!0,a=n.component;return"ionBlur"===l&&(t=!1!==e.zb(n,56)._handleBlurEvent(u.target)&&t),"ionChange"===l&&(t=!1!==e.zb(n,56)._handleChangeEvent(u.target)&&t),"ngModelChange"===l&&(t=!1!==(a.patient.dob=u)&&t),t}),g.ab,g.k)),e.ob(54,16384,null,0,p.j,[],{required:[0,"required"]},null),e.Eb(1024,null,p.c,(function(n){return[n]}),[p.j]),e.ob(56,16384,null,0,a.Rb,[e.k],null,null),e.Eb(1024,null,p.d,(function(n){return[n]}),[a.Rb]),e.ob(58,671744,null,0,p.i,[[2,p.a],[6,p.c],[8,null],[6,p.d]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Eb(2048,null,p.e,null,[p.i]),e.ob(60,16384,null,0,p.f,[[4,p.e]],null,null),e.ob(61,49152,null,0,a.x,[e.h,e.k,e.z],{name:[0,"name"]},null),(n()(),e.pb(62,0,null,null,31,"ion-list",[],null,null,null,g.rb,g.A)),e.ob(63,49152,null,0,a.Q,[e.h,e.k,e.z],null,null),(n()(),e.pb(64,0,null,0,2,"ion-list-header",[],null,null,null,g.qb,g.B)),e.ob(65,49152,null,0,a.R,[e.h,e.k,e.z],null,null),(n()(),e.Hb(-1,0,["Gender"])),(n()(),e.pb(67,0,null,0,26,"ion-radio-group",[["name","gender"],["radio-group",""],["required",""]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,u){var t=!0,a=n.component;return"ionBlur"===l&&(t=!1!==e.zb(n,70)._handleBlurEvent(u.target)&&t),"ionChange"===l&&(t=!1!==e.zb(n,70)._handleChangeEvent(u.target)&&t),"ngModelChange"===l&&(t=!1!==(a.patient.gender=u)&&t),t}),g.vb,g.G)),e.ob(68,16384,null,0,p.j,[],{required:[0,"required"]},null),e.Eb(1024,null,p.c,(function(n){return[n]}),[p.j]),e.ob(70,16384,null,0,a.Rb,[e.k],null,null),e.Eb(1024,null,p.d,(function(n){return[n]}),[a.Rb]),e.ob(72,671744,null,0,p.i,[[2,p.a],[6,p.c],[8,null],[6,p.d]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Eb(2048,null,p.e,null,[p.i]),e.ob(74,16384,null,0,p.f,[[4,p.e]],null,null),e.ob(75,49152,null,0,a.db,[e.h,e.k,e.z],{name:[0,"name"]},null),(n()(),e.pb(76,0,null,0,8,"ion-item",[],null,null,null,g.ob,g.t)),e.ob(77,49152,null,0,a.J,[e.h,e.k,e.z],null,null),(n()(),e.pb(78,0,null,0,2,"ion-label",[],null,null,null,g.pb,g.z)),e.ob(79,49152,null,0,a.P,[e.h,e.k,e.z],null,null),(n()(),e.Hb(-1,0,["Female"])),(n()(),e.pb(81,0,null,0,3,"ion-radio",[["checked",""],["slot","start"],["value","female"]],null,[[null,"ionBlur"],[null,"ionSelect"]],(function(n,l,u){var t=!0;return"ionBlur"===l&&(t=!1!==e.zb(n,84)._handleBlurEvent(u.target)&&t),"ionSelect"===l&&(t=!1!==e.zb(n,84)._handleIonSelect(u.target)&&t),t}),g.wb,g.F)),e.Eb(5120,null,p.d,(function(n){return[n]}),[a.Pb]),e.ob(83,49152,null,0,a.cb,[e.h,e.k,e.z],{checked:[0,"checked"],value:[1,"value"]},null),e.ob(84,16384,null,0,a.Pb,[e.k],null,null),(n()(),e.pb(85,0,null,0,8,"ion-item",[],null,null,null,g.ob,g.t)),e.ob(86,49152,null,0,a.J,[e.h,e.k,e.z],null,null),(n()(),e.pb(87,0,null,0,2,"ion-label",[],null,null,null,g.pb,g.z)),e.ob(88,49152,null,0,a.P,[e.h,e.k,e.z],null,null),(n()(),e.Hb(-1,0,["Male"])),(n()(),e.pb(90,0,null,0,3,"ion-radio",[["slot","start"],["value","male"]],null,[[null,"ionBlur"],[null,"ionSelect"]],(function(n,l,u){var t=!0;return"ionBlur"===l&&(t=!1!==e.zb(n,93)._handleBlurEvent(u.target)&&t),"ionSelect"===l&&(t=!1!==e.zb(n,93)._handleIonSelect(u.target)&&t),t}),g.wb,g.F)),e.Eb(5120,null,p.d,(function(n){return[n]}),[a.Pb]),e.ob(92,49152,null,0,a.cb,[e.h,e.k,e.z],{value:[0,"value"]},null),e.ob(93,16384,null,0,a.Pb,[e.k],null,null),(n()(),e.pb(94,0,null,null,11,"ion-item",[],null,null,null,g.ob,g.t)),e.ob(95,49152,null,0,a.J,[e.h,e.k,e.z],null,null),(n()(),e.pb(96,0,null,0,2,"ion-label",[["floating",""]],null,null,null,g.pb,g.z)),e.ob(97,49152,null,0,a.P,[e.h,e.k,e.z],null,null),(n()(),e.Hb(-1,0,["Town"])),(n()(),e.pb(99,0,null,0,6,"ion-input",[["name","town"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,u){var t=!0,a=n.component;return"ionBlur"===l&&(t=!1!==e.zb(n,100)._handleBlurEvent(u.target)&&t),"ionChange"===l&&(t=!1!==e.zb(n,100)._handleInputEvent(u.target)&&t),"ngModelChange"===l&&(t=!1!==(a.patient.town=u)&&t),t}),g.ib,g.s)),e.ob(100,16384,null,0,a.Sb,[e.k],null,null),e.Eb(1024,null,p.d,(function(n){return[n]}),[a.Sb]),e.ob(102,671744,null,0,p.i,[[2,p.a],[8,null],[8,null],[6,p.d]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Eb(2048,null,p.e,null,[p.i]),e.ob(104,16384,null,0,p.f,[[4,p.e]],null,null),e.ob(105,49152,null,0,a.I,[e.h,e.k,e.z],{name:[0,"name"],type:[1,"type"]},null),(n()(),e.pb(106,0,null,null,11,"ion-item",[],null,null,null,g.ob,g.t)),e.ob(107,49152,null,0,a.J,[e.h,e.k,e.z],null,null),(n()(),e.pb(108,0,null,0,2,"ion-label",[["floating",""]],null,null,null,g.pb,g.z)),e.ob(109,49152,null,0,a.P,[e.h,e.k,e.z],null,null),(n()(),e.Hb(-1,0,["Phone Number"])),(n()(),e.pb(111,0,null,0,6,"ion-input",[["name","phoneNumber"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,u){var t=!0,a=n.component;return"ionBlur"===l&&(t=!1!==e.zb(n,112)._handleBlurEvent(u.target)&&t),"ionChange"===l&&(t=!1!==e.zb(n,112)._handleInputEvent(u.target)&&t),"ngModelChange"===l&&(t=!1!==(a.patient.phoneNumber=u)&&t),t}),g.ib,g.s)),e.ob(112,16384,null,0,a.Sb,[e.k],null,null),e.Eb(1024,null,p.d,(function(n){return[n]}),[a.Sb]),e.ob(114,671744,null,0,p.i,[[2,p.a],[8,null],[8,null],[6,p.d]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Eb(2048,null,p.e,null,[p.i]),e.ob(116,16384,null,0,p.f,[[4,p.e]],null,null),e.ob(117,49152,null,0,a.I,[e.h,e.k,e.z],{name:[0,"name"],type:[1,"type"]},null),(n()(),e.pb(118,0,null,null,11,"ion-item",[],null,null,null,g.ob,g.t)),e.ob(119,49152,null,0,a.J,[e.h,e.k,e.z],null,null),(n()(),e.pb(120,0,null,0,2,"ion-label",[["floating",""]],null,null,null,g.pb,g.z)),e.ob(121,49152,null,0,a.P,[e.h,e.k,e.z],null,null),(n()(),e.Hb(-1,0,["Contact First Name"])),(n()(),e.pb(123,0,null,0,6,"ion-input",[["name","contactFirstName"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,u){var t=!0,a=n.component;return"ionBlur"===l&&(t=!1!==e.zb(n,124)._handleBlurEvent(u.target)&&t),"ionChange"===l&&(t=!1!==e.zb(n,124)._handleInputEvent(u.target)&&t),"ngModelChange"===l&&(t=!1!==(a.patient.contactFirstName=u)&&t),t}),g.ib,g.s)),e.ob(124,16384,null,0,a.Sb,[e.k],null,null),e.Eb(1024,null,p.d,(function(n){return[n]}),[a.Sb]),e.ob(126,671744,null,0,p.i,[[2,p.a],[8,null],[8,null],[6,p.d]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Eb(2048,null,p.e,null,[p.i]),e.ob(128,16384,null,0,p.f,[[4,p.e]],null,null),e.ob(129,49152,null,0,a.I,[e.h,e.k,e.z],{name:[0,"name"],type:[1,"type"]},null),(n()(),e.pb(130,0,null,null,11,"ion-item",[],null,null,null,g.ob,g.t)),e.ob(131,49152,null,0,a.J,[e.h,e.k,e.z],null,null),(n()(),e.pb(132,0,null,0,2,"ion-label",[["floating",""]],null,null,null,g.pb,g.z)),e.ob(133,49152,null,0,a.P,[e.h,e.k,e.z],null,null),(n()(),e.Hb(-1,0,["Contact Last Name"])),(n()(),e.pb(135,0,null,0,6,"ion-input",[["name","contactLastName"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,u){var t=!0,a=n.component;return"ionBlur"===l&&(t=!1!==e.zb(n,136)._handleBlurEvent(u.target)&&t),"ionChange"===l&&(t=!1!==e.zb(n,136)._handleInputEvent(u.target)&&t),"ngModelChange"===l&&(t=!1!==(a.patient.contactLastName=u)&&t),t}),g.ib,g.s)),e.ob(136,16384,null,0,a.Sb,[e.k],null,null),e.Eb(1024,null,p.d,(function(n){return[n]}),[a.Sb]),e.ob(138,671744,null,0,p.i,[[2,p.a],[8,null],[8,null],[6,p.d]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Eb(2048,null,p.e,null,[p.i]),e.ob(140,16384,null,0,p.f,[[4,p.e]],null,null),e.ob(141,49152,null,0,a.I,[e.h,e.k,e.z],{name:[0,"name"],type:[1,"type"]},null),(n()(),e.pb(142,0,null,null,11,"ion-item",[],null,null,null,g.ob,g.t)),e.ob(143,49152,null,0,a.J,[e.h,e.k,e.z],null,null),(n()(),e.pb(144,0,null,0,2,"ion-label",[["floating",""]],null,null,null,g.pb,g.z)),e.ob(145,49152,null,0,a.P,[e.h,e.k,e.z],null,null),(n()(),e.Hb(-1,0,["Contact Phone Number"])),(n()(),e.pb(147,0,null,0,6,"ion-input",[["name","contactPhoneNumber"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,u){var t=!0,a=n.component;return"ionBlur"===l&&(t=!1!==e.zb(n,148)._handleBlurEvent(u.target)&&t),"ionChange"===l&&(t=!1!==e.zb(n,148)._handleInputEvent(u.target)&&t),"ngModelChange"===l&&(t=!1!==(a.patient.contactPhoneNumber=u)&&t),t}),g.ib,g.s)),e.ob(148,16384,null,0,a.Sb,[e.k],null,null),e.Eb(1024,null,p.d,(function(n){return[n]}),[a.Sb]),e.ob(150,671744,null,0,p.i,[[2,p.a],[8,null],[8,null],[6,p.d]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Eb(2048,null,p.e,null,[p.i]),e.ob(152,16384,null,0,p.f,[[4,p.e]],null,null),e.ob(153,49152,null,0,a.I,[e.h,e.k,e.z],{name:[0,"name"],type:[1,"type"]},null),(n()(),e.pb(154,0,null,null,7,"ion-toolbar",[],null,null,null,g.Fb,g.P)),e.ob(155,49152,null,0,a.Eb,[e.h,e.k,e.z],null,null),(n()(),e.pb(156,0,null,0,2,"ion-button",[["color","primary"],["shape","round"],["slot","end"],["type","submit"]],null,null,null,g.T,g.d)),e.ob(157,49152,null,0,a.m,[e.h,e.k,e.z],{color:[0,"color"],disabled:[1,"disabled"],shape:[2,"shape"],type:[3,"type"]},null),(n()(),e.Hb(-1,0,["Save"])),(n()(),e.pb(159,0,null,0,2,"ion-button",[["color","primary"],["shape","round"],["slot","end"]],null,[[null,"click"]],(function(n,l,u){var e=!0;return"click"===l&&(e=!1!==n.component.submitAndNext()&&e),e}),g.T,g.d)),e.ob(160,49152,null,0,a.m,[e.h,e.k,e.z],{color:[0,"color"],disabled:[1,"disabled"],shape:[2,"shape"]},null),(n()(),e.Hb(-1,0,["Save, biopsy next"]))],(function(n,l){var u=l.component;n(l,26,0,""),n(l,30,0,"firstName",u.patient.firstName),n(l,33,0,"firstName","","text"),n(l,40,0,""),n(l,44,0,"lastName",u.patient.lastName),n(l,47,0,"lastName","","text"),n(l,54,0,""),n(l,58,0,"dob",u.patient.dob),n(l,61,0,"dob"),n(l,68,0,""),n(l,72,0,"gender",u.patient.gender),n(l,75,0,"gender"),n(l,83,0,"","female"),n(l,92,0,"male"),n(l,102,0,"town",u.patient.town),n(l,105,0,"town","text"),n(l,114,0,"phoneNumber",u.patient.phoneNumber),n(l,117,0,"phoneNumber","text"),n(l,126,0,"contactFirstName",u.patient.contactFirstName),n(l,129,0,"contactFirstName","text"),n(l,138,0,"contactLastName",u.patient.contactLastName),n(l,141,0,"contactLastName","text"),n(l,150,0,"contactPhoneNumber",u.patient.contactPhoneNumber),n(l,153,0,"contactPhoneNumber","text"),n(l,157,0,"primary",!e.zb(l,17).form.valid,"round","submit"),n(l,160,0,"primary",!e.zb(l,17).form.valid,"round")}),(function(n,l){n(l,15,0,e.zb(l,19).ngClassUntouched,e.zb(l,19).ngClassTouched,e.zb(l,19).ngClassPristine,e.zb(l,19).ngClassDirty,e.zb(l,19).ngClassValid,e.zb(l,19).ngClassInvalid,e.zb(l,19).ngClassPending),n(l,25,0,e.zb(l,26).required?"":null,e.zb(l,32).ngClassUntouched,e.zb(l,32).ngClassTouched,e.zb(l,32).ngClassPristine,e.zb(l,32).ngClassDirty,e.zb(l,32).ngClassValid,e.zb(l,32).ngClassInvalid,e.zb(l,32).ngClassPending),n(l,39,0,e.zb(l,40).required?"":null,e.zb(l,46).ngClassUntouched,e.zb(l,46).ngClassTouched,e.zb(l,46).ngClassPristine,e.zb(l,46).ngClassDirty,e.zb(l,46).ngClassValid,e.zb(l,46).ngClassInvalid,e.zb(l,46).ngClassPending),n(l,53,0,e.zb(l,54).required?"":null,e.zb(l,60).ngClassUntouched,e.zb(l,60).ngClassTouched,e.zb(l,60).ngClassPristine,e.zb(l,60).ngClassDirty,e.zb(l,60).ngClassValid,e.zb(l,60).ngClassInvalid,e.zb(l,60).ngClassPending),n(l,67,0,e.zb(l,68).required?"":null,e.zb(l,74).ngClassUntouched,e.zb(l,74).ngClassTouched,e.zb(l,74).ngClassPristine,e.zb(l,74).ngClassDirty,e.zb(l,74).ngClassValid,e.zb(l,74).ngClassInvalid,e.zb(l,74).ngClassPending),n(l,99,0,e.zb(l,104).ngClassUntouched,e.zb(l,104).ngClassTouched,e.zb(l,104).ngClassPristine,e.zb(l,104).ngClassDirty,e.zb(l,104).ngClassValid,e.zb(l,104).ngClassInvalid,e.zb(l,104).ngClassPending),n(l,111,0,e.zb(l,116).ngClassUntouched,e.zb(l,116).ngClassTouched,e.zb(l,116).ngClassPristine,e.zb(l,116).ngClassDirty,e.zb(l,116).ngClassValid,e.zb(l,116).ngClassInvalid,e.zb(l,116).ngClassPending),n(l,123,0,e.zb(l,128).ngClassUntouched,e.zb(l,128).ngClassTouched,e.zb(l,128).ngClassPristine,e.zb(l,128).ngClassDirty,e.zb(l,128).ngClassValid,e.zb(l,128).ngClassInvalid,e.zb(l,128).ngClassPending),n(l,135,0,e.zb(l,140).ngClassUntouched,e.zb(l,140).ngClassTouched,e.zb(l,140).ngClassPristine,e.zb(l,140).ngClassDirty,e.zb(l,140).ngClassValid,e.zb(l,140).ngClassInvalid,e.zb(l,140).ngClassPending),n(l,147,0,e.zb(l,152).ngClassUntouched,e.zb(l,152).ngClassTouched,e.zb(l,152).ngClassPristine,e.zb(l,152).ngClassDirty,e.zb(l,152).ngClassValid,e.zb(l,152).ngClassInvalid,e.zb(l,152).ngClassPending)}))}function z(n){return e.Jb(0,[(n()(),e.pb(0,0,null,null,1,"app-patient-form",[],null,null,null,m,c)),e.ob(1,114688,null,0,b,[a.Kb,i.a,a.f,a.a,h.a,r.a],null,null)],(function(n,l){n(l,1,0)}),null)}var C=e.lb("app-patient-form",b,z,{},{},[]),v=u("Ip0R");u.d(l,"PatientFormPageModuleNgFactory",(function(){return f}));var f=e.mb(s,[],(function(n){return e.wb([e.xb(512,e.j,e.bb,[[8,[d.a,C]],[3,e.j],e.x]),e.xb(4608,v.m,v.l,[e.u,[2,v.w]]),e.xb(4608,p.m,p.m,[]),e.xb(4608,a.b,a.b,[e.z,e.g]),e.xb(4608,a.Jb,a.Jb,[a.b,e.j,e.q]),e.xb(4608,a.Ob,a.Ob,[a.b,e.j,e.q]),e.xb(1073742336,v.b,v.b,[]),e.xb(1073742336,p.k,p.k,[]),e.xb(1073742336,p.b,p.b,[]),e.xb(1073742336,a.Gb,a.Gb,[]),e.xb(1073742336,h.o,h.o,[[2,h.u],[2,h.m]]),e.xb(1073742336,s,s,[]),e.xb(1024,h.k,(function(){return[[{path:"",component:b}]]}),[])])}))}}]);