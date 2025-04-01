let clientes = JSON.parse(localStorage.getItem('clientes')) || [
  { id: 1, nombre: "Juan Pérez", email: "juan@correo.com", telefono: "123456789", estado: "nuevo" },
  { id: 2, nombre: "María López", email: "maria@correo.com", telefono: "987654321", estado: "negociacion" },
  { id: 3, nombre: "Carlos Gómez", email: "carlos@correo.com", telefono: "555123456", estado: "contactado" }
];

function guardarClientes() {
  localStorage.setItem('clientes', JSON.stringify(clientes));
}

function cargarKanban() {
  const estados = ["nuevo", "contactado", "negociacion", "cerrado"];
  const kanban = document.getElementById("kanban");
  kanban.innerHTML = "";
  estados.forEach(estado => {
    const col = document.createElement("div");
    col.className = "col";
    col.innerHTML = `<h4>${estado[0].toUpperCase() + estado.slice(1)}</h4><div class='kanban-col' id='col-${estado}'></div>`;
    kanban.appendChild(col);
  });
  clientes.forEach(c => {
    const card = document.createElement("div");
    card.className = "card mb-2 p-2";
    card.innerHTML = `<strong>${c.nombre}</strong><br>${c.email}<br>${c.telefono}`;
    document.getElementById("col-" + c.estado).appendChild(card);
  });
}

function cargarTabla() {
  const tabla = document.getElementById("tabla-clientes");
  tabla.innerHTML = "";
  clientes.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${c.nombre}</td><td>${c.email}</td><td>${c.telefono}</td><td>${c.estado}</td>
      <td>
        <button class='btn btn-sm btn-info' onclick='editarCliente(${c.id})'>Editar</button>
        <button class='btn btn-sm btn-danger' onclick='eliminarCliente(${c.id})'>Eliminar</button>
      </td>`;
    tabla.appendChild(tr);
  });
}

function abrirFormulario() {
  document.getElementById("cliente-id").value = "";
  document.getElementById("cliente-nombre").value = "";
  document.getElementById("cliente-email").value = "";
  document.getElementById("cliente-telefono").value = "";
  document.getElementById("cliente-estado").value = "nuevo";
  new bootstrap.Modal(document.getElementById("clienteModal")).show();
}

function guardarCliente(e) {
  e.preventDefault();
  const id = document.getElementById("cliente-id").value;
  const cliente = {
    id: id ? parseInt(id) : Date.now(),
    nombre: document.getElementById("cliente-nombre").value,
    email: document.getElementById("cliente-email").value,
    telefono: document.getElementById("cliente-telefono").value,
    estado: document.getElementById("cliente-estado").value
  };
  if (id) {
    const i = clientes.findIndex(c => c.id == id);
    clientes[i] = cliente;
  } else {
    clientes.push(cliente);
  }
  guardarClientes();
  cargarKanban();
  cargarTabla();
  bootstrap.Modal.getInstance(document.getElementById("clienteModal")).hide();
}

function editarCliente(id) {
  const c = clientes.find(c => c.id === id);
  document.getElementById("cliente-id").value = c.id;
  document.getElementById("cliente-nombre").value = c.nombre;
  document.getElementById("cliente-email").value = c.email;
  document.getElementById("cliente-telefono").value = c.telefono;
  document.getElementById("cliente-estado").value = c.estado;
  new bootstrap.Modal(document.getElementById("clienteModal")).show();
}

function eliminarCliente(id) {
  clientes = clientes.filter(c => c.id !== id);
  guardarClientes();
  cargarKanban();
  cargarTabla();
}

cargarKanban();
cargarTabla();
