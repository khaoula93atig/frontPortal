import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/angular";
import {RendezVousService} from "../services/rendez-vous.service";
import {RendezVousEntity} from "../../models/RendezVous";
import {DatePipe, formatDate} from "@angular/common";
import {AccountService} from "../services/account.service";
import {UserEntity} from "../../models/userEntity";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";




@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  Events = [];
  displayModal=false;
  RendezvousS: RendezVousEntity[] = [];
  calendarOptions: CalendarOptions;
  rdvId: number;
  medecinId: number
  medecin = new UserEntity();
  displayBasic2 = false;
  displayBasic = false;
  patient: string;
  date: Date;
  debut: Date;
  rendezvous = new RendezVousEntity();
  ajoutRDVform: FormGroup;
  modifierRDVform: FormGroup;
  medecins: UserEntity[]=[];
  heures=['08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];
  dateajout:Date;
  heur='';
  id:number;

  constructor(private rdvService: RendezVousService,
              private userService: AccountService,
              private fb: FormBuilder,
              private toastr: ToastrService) {
  }

  ngAfterViewInit() {
this.Events=[]
    this.getAllRdv();

    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'today dayGridMonth,dayGridWeek',

      },
      themeSystem: 'bootstrap',
      buttonText: {
        today: 'Aujourd\'hui',
        month: 'Mois',
        week: 'Semaine',
        day: 'Jour',
        list: 'Liste'
      },
      locale: 'fr',
      selectable: true,
      initialView: 'dayGridMonth',
      dateClick: this.onDateClick.bind(this),
      eventClick: this.onEventClick.bind(this),
      eventColor: '#5bc0de',
      height:600,
      eventBorderColor:'#5bc0de',
      editable:true
    };
  }

  ngOnInit(): void {
    this.ajoutRDVform =this.fb.group({
      patientEmail:['', Validators.required],
      user: ['', Validators.required],
      dateajout: ['', Validators.required],
      heure: ['', Validators.required]
    })
    this.modifierRDVform =this.fb.group({
      patientEmail:['', Validators.required],
      user: ['', Validators.required],
      date: ['', Validators.required],
      heure: ['', Validators.required]
    })
    this.getAllRdv();
    this.getAllMedecin();
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'today dayGridMonth,dayGridWeek',

      },
      themeSystem: 'bootstrap',
      buttonText: {
        today: 'Aujourd\'hui',
        month: 'Mois',
        week: 'Semaine',
        day: 'Jour',
        list: 'Liste'
      },
      locale: 'fr',
      selectable: true,
      initialView: 'dayGridWeek',
      dateClick: this.onDateClick.bind(this),
      eventClick: this.onEventClick.bind(this),
      eventColor: '#1abc9c',
      eventBorderColor: '#1abc9c',
      editable: true
    };
  }

  onDateClick(res) {
    this.displayModal = true;
    this.dateajout=res.date;
  }

  onEventClick(info) {
    this.displayBasic2=true;
    this.rdvId = info.event.id;
    this.medecinId = info.event.extendedProps.user;
    this.patient = info.event.title;
    this.date = info.event.start;
    this.debut = info.event.extendedProps.date;
    console.log(this.debut.toString())
    this.rdvService.getbyid(info.event.id).subscribe(data => {
      this.rendezvous=data;
      console.log(data)


    })
  }


  getAllRdv() {
    this.rdvService.getrdvByState("confirmed").subscribe(data => {
      this.RendezvousS = data;
      this.calendarOptions.events = [];
      for (let rdv of this.RendezvousS) {
        let daystart = formatDate(rdv.dateOfApt, 'yyyy-MM-dd HH:mm:ss', 'en_Us');
        let start = formatDate(rdv.dateOfApt, 'HH:mm', 'en_Fr');
        let event = {
          id: rdv.idapt,
          title: rdv.patientEmail,
          start: daystart.toString(),
          background: '#1abc9c',
          extendedProps: {
            user: rdv.user.id,
            date: start.toString()
          }

        };
        this.Events.push(event);
        this.calendarOptions.events = this.Events;
      }
    })
  }

  modifier() {
    console.log(this.medecinId)
    for(let m of this.medecins){
      if(m.id==this.medecinId){
        this.rendezvous.user=m;
      }
    }
    let format = formatDate(this.date, 'yyyy-MM-dd', 'en_FR')
    console.log(format)
    let hr = new Date(format+ 'T' + this.debut+ ':00');
    this.rendezvous.patientEmail=this.modifierRDVform.get('patientEmail').value;
    this.rendezvous.dateOfApt=hr;
    console.log(this.rendezvous )
    this.rdvService.updateApt(this.rendezvous).subscribe(data=> {
      console.log(data)
      this.toastr.success('modification avec succes')
      this.ngAfterViewInit();
      this.modifierRDVform.reset()
    })

  }
  getuserbyid(){
  this.userService.getById(this.modifierRDVform.get('user').value).subscribe(data=>this.rendezvous.user=data);
}

  getAllMedecin(){
    this.userService.getuserByRole("Medecin").subscribe(data=>{this.medecins=data;
      console.log(this.medecins)});
  }

  ajoutRdv(){
    let formattedDt = formatDate(this.dateajout, 'yyyy-MM-dd', 'en_FR')
    console.log(formattedDt)
    let hr = new Date(formattedDt+ 'T' + this.heur+ ':00');
    let rdv:any={patientEmail:this.ajoutRDVform.get('patientEmail').value, user:{id:this.id},dateOfApt:hr}
    console.log(this.date+this.heur,rdv )
    this.rdvService.ajouterApt(rdv).subscribe(data=> {
      console.log(data)
      this.toastr.success('ajout avec succes')
      this.ngAfterViewInit();
      this.ajoutRDVform.reset()
    },
      erreur=>this.toastr.error('verfier les donné'))
  }
  annulerRDV(){
    this.rdvService.refuserRdv(this.rendezvous).subscribe(res=>{
      this.toastr.success('rendezvous annulé')
    })
  }

}
