import ServiceBase from '.';
import {IGroupDetail} from './type';
import {VocabularyCategory} from 'Providers/Models/type';
import {Sleep} from 'Commons';

class HomeService extends ServiceBase implements IGroupDetail {
  GetVocabularyCategories = async () =>
    // param: IVocabularyCategoriesParamRequest,
    {
      await Sleep(1000);
      const dataVocab: VocabularyCategory[] = [
        {
          Id: '1',
          Name: 'Animal',
          NameVN: 'Động Vật',
          Image:
            'https://is4-ssl.mzstatic.com/image/thumb/Purple111/v4/72/29/03/722903ab-0a9a-e9b0-8452-10326f26fd80/source/512x512bb.jpg',
        },
        {
          Id: '2',
          Name: 'Time',
          NameVN: 'Thời gian',
          Image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQaHJ6tx6gTjvBikJPkC9HfIQrwK4qXNh0HkQ&usqp=CAU',
        },
        {
          Id: '3',
          Name: 'Alphabet',
          NameVN: 'Chữ cái',
          Image:
            'https://www.holidayeducationist.com/wp-content/uploads/2014/05/iTunesArtwork@2x.png',
        },
        {
          Id: '4',
          Name: 'Ordinal',
          NameVN: 'Con Số',
          Image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjVdfVIHX6nqMduY2SyF14FC4OJrMvGLeHgA&usqp=CAU',
        },
        {
          Id: '5',
          Name: 'Hotel',
          NameVN: 'Khách Sạn',
          Image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSR4kqU8x7Z7ckoJw70jp15nSC9Y8A_EIywYw&usqp=CAU',
        },
      ];

      return dataVocab;
    };
}

export default new HomeService();
