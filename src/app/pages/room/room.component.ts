import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit, AfterViewInit {

  private route = inject(ActivatedRoute);
  @ViewChild('root')
  root!: ElementRef;
  roomID : string ='';
  
  ngOnInit(): void {
   this.route.params.subscribe((param) => {
    this.roomID = (param['roomId']);
   } )
  }

  ngAfterViewInit() {
    const appID = 1595694587;
    const serverSecret = "36310694521ff1f9e29ba44466802bfd";

    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, this.roomID,  'UDG',  Date.now().toString());

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);

     // Start a call.
     zp.joinRoom({
      container: this.root.nativeElement,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol + '//' + 
            window.location.host + window.location.pathname +
            '?roomID=' +
            this.roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
  });
  }

}
