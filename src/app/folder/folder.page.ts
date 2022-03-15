import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  private _cadena: string;

  get cadena() { return this._cadena; }

  constructor(private activatedRoute: ActivatedRoute,
              private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

/*
  scanQR() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this._cadena = text;

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }
*/

  scanPDF417() {
    this.barcodeScanner.scan(
      {
        preferFrontCamera : false, // iOS and Android
        showFlipCameraButton : true, // iOS and Android
        showTorchButton : true, // iOS and Android
        torchOn: false, // Android, launch with the torch switched on (if available)
        prompt : "Enfoque el código dentro del área de lectura", // Android
        resultDisplayDuration: 1500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
        formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
        orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
        disableSuccessBeep: false // iOS and Android
      }
    ).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this._cadena = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
