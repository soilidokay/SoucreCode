import ServiceBase from '.';
import {ILearningGoalDetail} from './type';
import {Vocabulary} from 'Providers/Models/type';
import {Sleep} from 'Commons';

class LearningGoalDetailService extends ServiceBase
  implements ILearningGoalDetail {
  GetVocabularies = async () =>
    //   param: ILGVocabularyParamRequest
    {
      await Sleep(1000);
      const dataVocab: Vocabulary[] = [
        {
          Id: '1',
          Word: 'Animal',
          WordVN: 'Động Vật',
          Phrase: '',
          Image:
            'https://is4-ssl.mzstatic.com/image/thumb/Purple111/v4/72/29/03/722903ab-0a9a-e9b0-8452-10326f26fd80/source/512x512bb.jpg',
        },
        {
          Id: '2',
          Word: 'Time',
          WordVN: 'Thời gian',
          Phrase: '',
          Image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQaHJ6tx6gTjvBikJPkC9HfIQrwK4qXNh0HkQ&usqp=CAU',
        },
        {
          Id: '3',
          Word: 'Alphabet',
          WordVN: 'Chữ cái',
          Phrase: '',
          Image:
            'https://www.holidayeducationist.com/wp-content/uploads/2014/05/iTunesArtwork@2x.png',
        },
        {
          Id: '4',
          Word: 'Ordinal',
          WordVN: 'Con Số',
          Phrase: '',
          Image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjVdfVIHX6nqMduY2SyF14FC4OJrMvGLeHgA&usqp=CAU',
        },
        {
          Id: '5',
          Word: 'Hotel',
          WordVN: 'Khách Sạn',
          Phrase: '',
          Image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSR4kqU8x7Z7ckoJw70jp15nSC9Y8A_EIywYw&usqp=CAU',
        },
        {
          Id: '6',
          Word: 'Animal',
          WordVN: 'Động Vật',
          Phrase: '',
          Image:
            'https://is4-ssl.mzstatic.com/image/thumb/Purple111/v4/72/29/03/722903ab-0a9a-e9b0-8452-10326f26fd80/source/512x512bb.jpg',
        },
        {
          Id: '7',
          Word: 'Time',
          WordVN: 'Thời gian',
          Phrase: '',
          Image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQaHJ6tx6gTjvBikJPkC9HfIQrwK4qXNh0HkQ&usqp=CAU',
        },
        {
          Id: '8',
          Word: 'Alphabet',
          WordVN: 'Chữ cái',
          Phrase: '',
          Image:
            'https://www.holidayeducationist.com/wp-content/uploads/2014/05/iTunesArtwork@2x.png',
        },
        {
          Id: '9',
          Word: 'Ordinal',
          WordVN: 'Con Số',
          Phrase: '',
          Image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjVdfVIHX6nqMduY2SyF14FC4OJrMvGLeHgA&usqp=CAU',
        },
        {
          Id: '10',
          Word: 'Hotel',
          WordVN: 'Khách Sạn',
          Phrase: '',
          Image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSR4kqU8x7Z7ckoJw70jp15nSC9Y8A_EIywYw&usqp=CAU',
        },
        {
          Id: '11',
          Word: 'Animal',
          WordVN: 'Động Vật',
          Phrase: '',
          Image:
            'https://is4-ssl.mzstatic.com/image/thumb/Purple111/v4/72/29/03/722903ab-0a9a-e9b0-8452-10326f26fd80/source/512x512bb.jpg',
        },
        {
          Id: '12',
          Word: 'Time',
          WordVN: 'Thời gian',
          Phrase: '',
          Image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQaHJ6tx6gTjvBikJPkC9HfIQrwK4qXNh0HkQ&usqp=CAU',
        },
        {
          Id: '13',
          Word: 'Alphabet',
          WordVN: 'Chữ cái',
          Phrase: '',
          Image:
            'https://www.holidayeducationist.com/wp-content/uploads/2014/05/iTunesArtwork@2x.png',
        },
        {
          Id: '14',
          Word: 'Ordinal',
          WordVN: 'Con Số',
          Phrase: '',
          Image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjVdfVIHX6nqMduY2SyF14FC4OJrMvGLeHgA&usqp=CAU',
        },
        {
          Id: '15',
          Word: 'Hotel',
          WordVN: 'Khách Sạn',
          Phrase: '',
          Image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSR4kqU8x7Z7ckoJw70jp15nSC9Y8A_EIywYw&usqp=CAU',
        },
      ];

      return dataVocab;
    };
}

export default new LearningGoalDetailService();
