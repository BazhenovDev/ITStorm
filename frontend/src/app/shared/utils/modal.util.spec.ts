import {ModalUtil} from "./modal.util";
import {ServicesConstantsTitle, ServicesConstantsType} from "../../../constants/services.constants";

describe('modal util', () => {

  it ('should return name service with null type', () => {
    const result = ModalUtil.getTitle(null);
    expect(result).not.toBe('');
  });

  it ('should return name service with undefined type', () => {
    const result = ModalUtil.getTitle(undefined);
    expect(result).not.toBe('');
  });

  it ('should return development type with wrong type', () => {
      const result = ModalUtil.getTitle('test' as ServicesConstantsType);
      expect(result).toBe(ServicesConstantsTitle.development);
  })
})
