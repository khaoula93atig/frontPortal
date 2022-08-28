import { Days } from "./Days";
import { StateApt } from "./StateApt";
import { Temprdv } from "./Temprdv";
import { UserEntity } from "./userEntity";

export class RendezVousEntity{
    idapt:number;
    dateOfApt:Date;
    user:UserEntity;
    days:Days;
    stateApt:StateApt;
  patientEmail:string;

}
