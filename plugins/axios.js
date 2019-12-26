export default function ({$axios, redirect}) {

    $axios.setHeader('Content-Type', 'application/json');
    $axios.onError(error => {
        console.error(error);

    /* TODO:
        1. дописать логику;
        2.создать страницы под различные ошибки
                const errorCode = parseInt(error.response && error.response.status);
                console.error('Код ошибки: ${errorCode}');
                switch (errorCode) {
                    case '400':
                        redirect('/errors/400');
                        break;
                    case '500':
                        redirect('/errors/500');
                        break;
                    default:
                        redirect('/error');
                }
    */

    });
}
