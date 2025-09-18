import {ServicesConstantsTitle, ServicesConstantsType} from "../../../constants/services.constants";

export class ModalUtil {
  constructor() {
  }

  static getTitle(type: string): string {

    let serviceTitle: string = 'Разработка';

    switch (type) {
      case ServicesConstantsType.development:
        serviceTitle = ServicesConstantsTitle.development;
        break;
      case ServicesConstantsType.promotion:
        serviceTitle = ServicesConstantsTitle.promotion;
        break;
      case ServicesConstantsType.seo:
        serviceTitle = ServicesConstantsTitle.seo;
        break;
      case ServicesConstantsType.copywriting:
        serviceTitle = ServicesConstantsTitle.copywriting;
        break;
    }
    return serviceTitle;
  }
}
