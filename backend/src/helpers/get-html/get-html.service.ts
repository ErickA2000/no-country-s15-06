import { matchKey } from '@Constants/regex';
import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class GetHtmlService {
  async get(html: 'register', lang = 'en', data?: Data): Promise<string> {
    const path = this.resolvePath(`${html}_${lang}.html`);
    const htmlContent = await readFile(path, 'utf8');

    if (data === undefined) return htmlContent;

    return this.changeKey(htmlContent, data);
  }
  private changeKey(html: string, data: Data): string {
    Object.keys(data).forEach((key) => {
      html = html.replace(matchKey(key), data[key]);
    });

    return html;
  }
  private resolvePath(filename: string): string {
    return join(__dirname, `../../../assets/static/${filename}`);
  }
}

interface Data {
  [key: string]: string;
}
