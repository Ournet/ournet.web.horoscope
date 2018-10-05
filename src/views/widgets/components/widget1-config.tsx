
import * as React from 'react';
import { WeatherViewModel } from '../../../view-models/horoscope-view-model';
import { LocalesNames } from '../../../locales-names';
import { PlaceHelper } from '../../../data/places/place-helper';

export default class Widget1Config extends React.Component<WeatherViewModel> {
    render() {
        const { __, capital: place, lang } = this.props;

        return (
            <div>
                <table className='o-table o-table--tiny'>
                    <tbody>
                        <tr>
                            <th>{__(LocalesNames.place)}</th>
                            <td>
                                <input type='text' className='c-wconfig__place' defaultValue={PlaceHelper.getName(place, lang)} />
                                <input type='hidden' name='id' className='c-wconfig__input c-wconfig__placeid' defaultValue={place.id} />
                            </td>
                        </tr>
                        <tr>
                            <th>{__(LocalesNames.days)}:</th>
                            <td>
                                <input type='number' maxLength={1} name='days' className='c-wconfig__input' defaultValue='5' max={9} min={1} />
                            </td>
                        </tr>
                        <tr>
                            <th>{__(LocalesNames.text_color)}:</th>
                            <td>
                                <input type='text' maxLength={6} name='textcolor' className='c-wconfig__input' placeholder='848484' />
                            </td>
                        </tr>
                        <tr>
                            <th>{__(LocalesNames.border_color)}:</th>
                            <td>
                                <input type='text' maxLength={6} name='bcolor' className='c-wconfig__input' placeholder='CA0000' />
                            </td>
                        </tr>
                        <tr>
                            <th>{__(LocalesNames.back_color)}:</th>
                            <td>
                                <input type='text' maxLength={6} name='bkcolor' className='c-wconfig__input' placeholder='FFF' />
                            </td>
                        </tr>
                        <tr>
                            <th>{__(LocalesNames.head_back_color)}:</th>
                            <td>
                                <input type='text' maxLength={6} name='hbkcolor' className='c-wconfig__input' placeholder='CA0000' />
                            </td>
                        </tr>
                        <tr>
                            <th>{__(LocalesNames.head_text_color)}:</th>
                            <td>
                                <input type='text' maxLength={6} name='htcolor' className='c-wconfig__input' placeholder='FFF' />
                            </td>
                        </tr>
                        <tr>
                            <th>{__(LocalesNames.line_color)}:</th>
                            <td>
                                <input type='text' maxLength={6} name='lcolor' className='c-wconfig__input' placeholder='DDD' />
                            </td>
                        </tr>
                        <tr>
                            <th>{__(LocalesNames.width)}:</th>
                            <td>
                                <input type='number' maxLength={3} name='w' className='c-wconfig__input' defaultValue='200' max={999} min={50} />
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td>
                                <button className='c-wconfig__btn c-btn c-btn--primary c-btn--small'>{__(LocalesNames.generate)}</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
