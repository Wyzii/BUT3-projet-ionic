import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss'],
})
export class GameFormComponent implements OnInit, OnChanges {
  @Input() existingCategories: string[] = [];
  @Input() gameData: any = null;
  @Input() submitButtonText: string = 'Soumettre';
  @Input() gameId: string | null = null;

  @Output() formSubmit = new EventEmitter<any>();

  gameForm: FormGroup;
  newCategories: string[] = [];

  constructor(private fb: FormBuilder, private gamesService: GamesService) {
    this.gameForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      playTime: [0, [Validators.required, Validators.min(0)]],
      logo: ['', [Validators.required, Validators.pattern('https?://.+')]],
      banner: ['', [Validators.required, Validators.pattern('https?://.+')]],
      categories: [[]],
    });
  }

  ngOnInit() {
    if (this.gameData) {
      this.patchFormValues();
    }
  }

  goBack() {
    window.history.back();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['gameData'] && changes['gameData'].currentValue) {
      this.patchFormValues();
    }
  }

  patchFormValues() {
    this.gameForm.patchValue(this.gameData);
  }

  addNewCategoryInput() {
    this.newCategories.push('');
  }

  removeNewCategory(index: number) {
    this.newCategories.splice(index, 1);
  }

  clearAllNewCategories() {
    this.newCategories = [];
  }

  trackByIndex(index: number): number {
    return index;
  }

  async onSubmit() {
    const formData = this.gameForm.value;
  
    formData.categories = [
      ...(formData.categories as string[]),
      ...this.newCategories.filter((cat) => cat.trim() !== ''),
    ];

    this.formSubmit.emit(formData);
  }

  async scanQRCode() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (status.granted) {
        const result = await BarcodeScanner.startScan();

        if (result.hasContent) {
          this.populateFormFromQRCode(result.content);
        }
      } else {
        console.error('Permission refusée.');
      }
    } catch (error) {
      console.error('Erreur lors du scan :', error);
    } finally {
      await BarcodeScanner.stopScan();
    }
  }

  populateFormFromQRCode(content: string) {
    try {
      const data = JSON.parse(content);

      this.gameForm.patchValue({
        name: data.name || '',
        playTime: data.playTime || '',
        description: data.description || '',
        logo: data.logo || '',
        banner: data.banner || '',
      });

      const categoriesFromQRCode = data.categories || [];
      const existingCategories = this.existingCategories;
      const newCategories: string[] = [];

      categoriesFromQRCode.forEach((category: string) => {
        if (!existingCategories.includes(category)) {
          newCategories.push(category);
        }
      });

      this.gameForm.patchValue({
        categories: [...categoriesFromQRCode],
      });

      this.newCategories = [...this.newCategories, ...newCategories];
    } catch (error) {
      console.error('Erreur de parsing JSON :', error);
    }
  }
}
