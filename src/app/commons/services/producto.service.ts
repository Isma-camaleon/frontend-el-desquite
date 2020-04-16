import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SearchPagination } from '../interfaces/search-pagination';
import { Observable } from 'rxjs';
import { ResultadoProc } from '../interfaces/resultado-proc.interface';
import { ProductoModel, ProductoFilter } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlBase = `${environment.backend_url}api/producto`;
  constructor(private http: HttpClient) { }

  /**
	 * Retorna un IPaginacion de todos los productos que coinciden con los filtros
	 * 
	 * @return Una página de productos
	 *         coincidentes con los filtros
	 */
  public findAllPaginatedWithFilters(searchPagination: SearchPagination<ProductoFilter>): Observable<ResultadoProc<IPaginacion<ProductoModel>>>{
    return this.http.post<ResultadoProc<IPaginacion<ProductoModel>>>(`${this.urlBase}/page-with-filters`, searchPagination);
  }

  /**
	 * Guarda o actualiza un producto
	 * 
	 * @param producto (Entidad ProductoModel)
	 * @return ProductoModel guardado/actualizado
	 */
  public save(producto: ProductoModel): Observable<ResultadoProc<ProductoModel>>{
    return this.http.post<ResultadoProc<ProductoModel>>(`${this.urlBase}`, producto);
  }

  /**
	 * Busca un producto por su ID.
	 * 
	 * @param productoId (Identificador del producto)
	 * @return ProductoModel con el ID dado
	 */
  public findById(productoId: number): Observable<ResultadoProc<ProductoModel>>{
    return this.http.get<ResultadoProc<ProductoModel>>(`${this.urlBase}/${productoId}`);
  }

  /**
	 * Cambia el estado del producto.
	 * 
	 * Si activo es true lo cambia a false. 
	 * 
	 * Si activo es false lo cambia a true.
	 * 
	 * @param productoId (Id del producto)
	 * @return ResultadoProc&lt;ProductoModel&gt; El producto al que le fue cambiado el
	 *         estado
	 */
	public changeState(productoId: number): Observable<ResultadoProc<ProductoModel>>{
		return this.http.get<ResultadoProc<ProductoModel>>(`${this.urlBase}/change-state/${productoId}` );
	}
}
