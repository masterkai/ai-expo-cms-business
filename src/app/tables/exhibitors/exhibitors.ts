import {AfterViewInit, Component, inject, signal, viewChild} from '@angular/core';
import {TableModule} from 'primeng/table';
import {DatePipe} from '@angular/common';
import {Button} from 'primeng/button';
import {MainStore} from './store/main.store';
import {MessageService} from 'primeng/api';
import {Tooltip} from 'primeng/tooltip';
import {Option} from '../../services/exhibition-rights-service';
import {CommonDialog} from '../../shared/components/common-dialog/common-dialog';
import {
  ExhibitionRightsSettingProcess
} from '../../exhibition-rights-setting-process/exhibition-rights-setting-process';
import {Company} from './store/main.slice';
import {FileDownload} from '../../services/file-download';
import {CompanyUpdateReviewService} from '../../services/company-update-review.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {PreviewUi} from './preview-ui/preview-ui';

@Component({
  selector: 'app-exhibitors',
  imports: [TableModule, DatePipe, Button, Tooltip, CommonDialog, ExhibitionRightsSettingProcess, PreviewUi],
  templateUrl: './exhibitors.html',
  styleUrl: './exhibitors.css',
  standalone: true,
})
export class Exhibitors implements AfterViewInit {
  rightSettingProcess = viewChild(ExhibitionRightsSettingProcess);
  messageService = inject(MessageService);
  modifyProcessService = inject(CompanyUpdateReviewService);
  mainStore = inject(MainStore);
  dialog = viewChild(CommonDialog);
  downloader = inject(FileDownload);
  displayMode = signal<DisplayMode>('edit');

  constructor() {
    toObservable(this.mainStore.current_compID).subscribe({
      next: (compID) => {
        // console.log('current_compID changed:', compID);
        if (compID !== '' && compID !== null) {
          this.mainStore.getBoothSpec(compID);
        }
      },
    });
  }

  ngAfterViewInit() {
    this.dialog()?.visible$.subscribe({
      next: (value) => {
        // console.log('Dialog visible changed:', value);
        // if dialog is closed, clear current company selection
        // and reset selected exhibition rights
        // and current company ID in the store
        if (!value) {
          if (this.rightSettingProcess()) {
            this.rightSettingProcess()!.stepper.value.set(1);
          }
          this.mainStore.setCurrentCompany(null);
          this.mainStore.resetSelectedExhibitionRights();
          this.mainStore.resetCurrentReviewDATA();
          this.mainStore.setCurrentCompID(null);
          this.mainStore.setSelectedSponsorShips(null);
          this.mainStore.setBoothStyle('');
          this.mainStore.setGridNumber('');
        }
        this.mainStore.setIsDialogVisible(value);
      },
    });
  }

  copyLinkToClipboard(exhibitor: Company) {
    const url = exhibitor.link;
    console.log('copyLinkToClipboard', url);
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log('連結已複製到剪貼簿');
        this.messageService.add({
          severity: 'success',
          summary: '成功',
          detail: '連結已複製到剪貼簿',
        });
      })
      .then(() => {
        this.mainStore.onGetLink(exhibitor.unified_business_no);
      })
      .catch((err) => {
        console.error('複製失敗：', err);
        this.messageService.add({severity: 'error', summary: '失敗', detail: '連結複製失敗'});
      });
  }

  renderArrayContent(items: Option[]) {
    return items.map((i) => i.option).join(', ');
  }

  protected exportCompanyCSV() {
    this.modifyProcessService
      .getHistoryDownload({
        cate: 'company',
        empno: this.mainStore.empno() || '',
        departid: this.mainStore.departid() || '',
      })
      .subscribe({
        next: (response) => {
          if (response.status === 'success' && response.data?.download_url) {
            const url = response.data.download_url;
            const filename = '參展商列表.csv';
            this.downloader.downloadCsv(url, filename).subscribe({
              next: () => {
                this.messageService.add({
                  severity: 'success',
                  summary: '下載完成',
                  detail: '公司資料下載完成',
                });
              },
              error: (err) => {
                this.messageService.add({
                  severity: 'error',
                  summary: '下載失敗',
                  detail: `公司資料下載失敗。${err.message ? ' ' + err.message : ''}`,
                });
              },
            });
          }
        },
      });
  }

  protected onClickExhibitorItem(exhibitor: Company) {
    this.displayMode.set('edit');
    this.mainStore.getExhibitionRights({id: exhibitor.unified_business_no, type: ''});
    this.mainStore.setCurrentCompany(exhibitor);
    this.mainStore.setIsDialogVisible(true);
  }

  protected onReviewItem(exhibitor: Company) {
    const uninum = exhibitor.unified_business_no;
    this.mainStore.fetchReviewDATAById(uninum);
    // console.log('unino', uninum);
    this.displayMode.set('review');
    this.mainStore.setIsDialogVisible(true);
  }
}

export type DisplayMode = 'edit' | 'review';
