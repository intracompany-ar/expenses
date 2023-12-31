// TODO: Refactorizar a type script

// Advices
export function info(content: string, titulo = null) { window.app.notificar('Info', content, titulo); }
export function danger(content: string, titulo = null) { window.app.notificar('Danger', content, titulo); }
export function warning(content: string, titulo = null) { window.app.notificar('Warning', content, titulo); }
export function success(content: string, titulo = null) { window.app.notificar('Success', content, titulo); }

// Cart
export function router(name, params) { return route(name, params); }
export function isAuth() { return authId !== 0 }

export const today = document.head.querySelector('meta[name="today"]')
    ? document.head.querySelector('meta[name="today"]').content
    : '';

export const urlBase = document.head.querySelector('meta[name="url-base"]')
    ? document.head.querySelector('meta[name="url-base"]').content
    : '';

export const csrf = document.head.querySelector('meta[name="csrf-token"]')
    ? document.head.querySelector('meta[name="csrf-token"]').content
    : 0;

export const authId = document.head.querySelector('meta[name="auth-id"]')
    ? parseInt(document.head.querySelector('meta[name="auth-id"]').content)
    : 0;

export const authName = document.head.querySelector('meta[name="auth-name"]')
    ? document.head.querySelector('meta[name="auth-name"]').content
    : null;

export const authEmail = document.head.querySelector('meta[name="auth-email"]')
    ? document.head.querySelector('meta[name="auth-email"]').content
    : null;

export const appId = document.head.querySelector('meta[name="app-id"]')
    ? parseInt(document.head.querySelector('meta[name="app-id"]').content)
    : null;

export const personId = document.head.querySelector('meta[name="person-id"]')
    ? parseInt(document.head.querySelector('meta[name="person-id"]').content)
    : null;

export const personFirstName = document.head.querySelector('meta[name="person-first-name"]')
    ? document.head.querySelector('meta[name="person-first-name"]').content
    : null;

export const profilePhoto = document.head.querySelector('meta[name="profile-photo"]')
    ? document.head.querySelector('meta[name="profile-photo"]').content
    : null;

export function disableSubmits() {
    const submits = document.querySelectorAll('button[type="submit"]');
    submits.forEach((submit) => {
        submit.disabled = true;
    });
}

export function enableSubmits() {
    const submits = document.querySelectorAll('button[type="submit"]');
    submits.forEach((submit) => {
        submit.disabled = false;
    });
}

export function showLoaders() {
    const loaders = document.getElementsByClassName('loader');
    for (let i = 0; i < loaders.length; i++) {
        loaders[i].style.visibility = 'visible';
    }
}

export function hideLoaders() {
    const loaders = document.getElementsByClassName('loader');
    for (let i = 0; i < loaders.length; i++) {
        loaders[i].style.visibility = 'hidden';
    }
}

/**
 * TODO Adaptar, estaba en app.js y lo moví aquí
 */
export function setFilters(filtersSelected) {
    console.debug('Nuevo set de filtros', filtersSelected);
    const filterValues = [
        'desde',
        'hasta',
        'from',
        'to',
        'company_group_id',
        'company_id',
        'sucursal_id',
        'employment_id',
        'zona_id',
        'puesto_id',
        'contract_id',
        'estatus_id',
        'shift_id',
        'schedule_id',
    ];

    filterValues.forEach((value) => {
        if (filtersSelected[value] !== undefined) {
            const el = document.getElementById(value);
            if (el) {
                if (el.nodeName === 'INPUT') {
                    if (el.type === 'checkbox') {
                        el.checked = filtersSelected[value];
                    } else {
                        el.value = filtersSelected[value];
                    }
                } else if (el.nodeName === 'SELECT') {
                    el.value = filtersSelected[value];
                }
            }
        }
    });
}

export async function copiar(textoACopiar) {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(textoACopiar, 'text/html').body.textContent;

    try {
        await navigator.clipboard.writeText(decodedString);
        window.app.notificar('Info', 'Texto copiado al portapapeles. Utilícelo con Ctrl+V o Pegar');
    } catch (err) {
        window.app.notificar('Danger', 'No se pudo copiar el texto al portapapeles.');
    }
}

// Hooks
import { ref } from 'vue'
export function useFetchDatatable() {
    const dataTableRows = ref([]);
    const dataTableTable = ref(null);

    function setRowsDatatable0(url, filtros = {}, tableId = '', buttons = [], select = false) {
        // filtros obj { fecha: '2021-01-01', tipo: 10}
        Object.keys(filtros).forEach(filtroKey => {
            let filtroValue = filtros[filtroKey] == '' ? ' ' : filtros[filtroKey];
            url = url.replace(':' + filtroKey, filtroValue).replace('%3A' + filtroKey, filtroValue); // El %3A porque si agrego la variable get sin laravel, con url?variable=valor  route() encode los : como %3A
        });
        getRows(url, tableId, buttons, select)
    }

    function getRows(url, tableId, buttons, select) {
        axios(url, {
            dataType: 'json',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            mode: 'no-cors',
            credentials: 'include'
        })
            .then(response => {
                resetDataTable();
                dataTableRows.value = response.data;
            })
            .catch(error => resetDataTable())
            .then(() => {
                if (tableId != '') {
                    // console.log('hola', tableId);
                    dataTableTable.value = $('#' + tableId).DataTable({
                        stateSave: true,
                        buttons: buttons,
                        select: select
                    }
                    )
                    // console.log(dataTableTable.value);
                }
            })
    }

    function resetDataTable() {
        dataTableRows.value = [];
        if (dataTableTable && dataTableTable.value) { dataTableTable.value.destroy() };
    }

    return { dataTableRows, setRowsDatatable0, resetDataTable, dataTableTable }
}


/**
 * Versión 2 de useFetchDatatable
 */
export function useFetch() {
    const dataTableRows = ref([])
    const dataTableTable = ref(null)

    function setRowsDatatable(url, tableId = '', config = {
        buttons: [], select: false, dom: 'Bpftilp'
    }) {
        axios(url, {
            dataType: 'json',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            mode: 'no-cors',
            credentials: 'include'
        })
            .then(response => {
                resetDataTable();
                dataTableRows.value = response.data;
            })
            .catch(error => resetDataTable())
            .then(() => {
                if (tableId != '') {
                    // console.log('hola', tableId);
                    let configs = {
                        stateSave: true,
                        buttons: config.buttons ?? [],
                        select: config.select ?? false,
                        dom: config.dom ?? 'Bpftilp',
                    };
                    dataTableTable.value = $('#' + tableId).DataTable(configs)
                    // console.log(dataTableTable.value);
                }
            })
    }


    function resetDataTable() {
        dataTableRows.value = [];
        if (dataTableTable && dataTableTable.value) { dataTableTable.value.destroy() };
    }
    return { dataTableRows, setRowsDatatable, resetDataTable, dataTableTable }
}


import { Modal } from 'bootstrap'
export function closeModals() {
    let modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        let modal = Modal.getInstance(modals[i]);// Getinstance toma instancia ya existente. No usar new Modal
        // Bootstrap solo crea la instancia del modal si alguna vez fue abierto, sino es solo código
        if (modal) { modal.hide() }
    }
}

export function openModal(modalId) {
    let element = document.getElementById(modalId);
    if (element) {
        let modal = new Modal(element);
        modal.show();
    } else { console.error('No existe el modal_id'); }
}



/**
 * Busca todos los datos y luego carga el autocomplete. Usar cuando no sean demasiados datos, evaluar la velocidad. Pero se la banca bien, ejemplo lo uso para artículos, son como 3000
 * 
 * @param {Boolean} params.backend Manda las cadena de busqueda al backend y solo trae esos resultados
 * @param {String} params.urlGet Url de búsqueda
 */
export function loadAutocomplete(params) {
    if (params.backend) {
        setAutocomplete(params)
    } else {
        axios(params.urlGet).then(response => {
            params.availableTags = response.data
            setAutocomplete(params)
        })
    }
};

function setAutocomplete(params) {
    // console.log(params)
    let options = {
        minLength: params.minLength ?? 3,
        delay: params.delay ?? 400,
        source(request, response) {
            response($.ui.autocomplete.filter(params.availableTags, request.term));
        },
        focus(event, ui) {
            setLabelsAutocomplete(ui, params.labels)
        },
        select(event, ui) {
            event.preventDefault();
            setLabelsAutocomplete(ui, params.labels);
            if (params.callbackSelect) { params.callbackSelect(ui) };// Después de setLabel
        },
        change(event, ui) {
            event.preventDefault();
            setLabelsAutocomplete(ui, params.labels);
        }
    };

    options.source = !params.availableTags ? params.urlGet : options.source;// Es backend

    $('#' + params.etiq + '').autocomplete(options)

};

function setLabelsAutocomplete(ui, labels) {
    if (ui.item) {
        labels.forEach(label => {
            document.getElementById(label.idFrontend).value = ui.item[label.idBackend]
            document.getElementById(label.idFrontend).innerHTML = ui.item[label.idBackend]
        });
    }
};


const REG_EXP_MAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REG_EXP_DIFFERENT_OF_NUMBER = /[^0-9]/g;

export function isEmail(text) {
    return REG_EXP_MAIL.test(String(text).toLowerCase());
};

export function validarCuit(cuitNoValidado) {
    cuitNoValidado = cuitNoValidado.toString();
    // console.log('cuitNoValidado', cuitNoValidado);
    let cuitSoloNumeros = cuitNoValidado.replace(REG_EXP_DIFFERENT_OF_NUMBER, '');
    // console.log('cuitSoloNumeros1', cuitSoloNumeros);
    if (cuitSoloNumeros.length != 11) { return false };

    let acumulado = 0;
    let arrayDigitos = cuitSoloNumeros.split("");
    let ultimoDigito = arrayDigitos.pop(); // elimina el último elemento y lo retorna

    arrayDigitos.forEach((element, key) => {
        acumulado += arrayDigitos[9 - key] * (2 + (key % 6));
    });

    let verif = (11 - (acumulado % 11)) == 11
        ? 0
        : 11 - (acumulado % 11);

    return ultimoDigito == verif;
}

export function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * A partir de un tipo entidad y un dni calcula el cuit
 * 
 * @param string,integer dni
 * @param string tipoEntidadParam  20, 30 por ejemplo
 * @return integer  NroCuit
 */
export function calculateCuitFromDni(doc, kind) {
    if (!['M', 'F', 'E'].includes(kind)) { return false; }
    let prefix = kind === 'M' ? '20' : kind === 'F' ? '27' : '30'

    // Completa con ceros a la izquierda si es menor a la longitud indicada, 8 por defecto
    const completeLeftZeros = (val, len = 8, padChar = '0') => {
        let str = isNaN(val) ? val : val.toString()
        const dif = len - str.length
        return dif <= 0 ? str : `${padChar.repeat(dif)}${str}`
    }
    let doc_completed_zeros = completeLeftZeros(doc)


    // fn Convierte string de nro a un array de numeros int
    const str2nums = str => str.split('').map(c => parseInt(c))

    // Arma un array de pares de elementos de dos arrays
    const zip = (arr1, arr2) => {
        let i, index, len1, n, ret
        ret = []
        for (index = i = 0, len1 = arr1.length; i < len1; index = ++i) {
            n = arr1[index]
            ret.push([n, arr2[index]])
        }
        return ret
    }

    const prefix_doc_completed_zeros = `${prefix}${doc_completed_zeros}`
    const factors = '5432765432';
    const zipped = zip(str2nums(factors), str2nums(prefix_doc_completed_zeros))
    const products = zipped.map((x) => x[0] * x[1])
    const sum = products.reduce((n, acum) => n + acum, 0)
    const rest = sum % 11

    // console.log('RESTOOO', rest);

    let digit_verificador = '';
    if (kind === 'E') {
        digit_verificador = (11 - rest).toString()
    } else {
        switch (rest) {
            case 0:
                digit_verificador = '0'
                break
            case 1:
                prefix = '23'
                if (kind === 'F') { digit_verificador = '4'; break; }
                if (kind === 'M') { digit_verificador = '9'; break; }
            default:
                digit_verificador = (11 - rest).toString()
        }
    }

    return prefix + doc_completed_zeros + digit_verificador;
}

