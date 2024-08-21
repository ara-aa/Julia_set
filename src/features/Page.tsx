import { Button, Form, FormInput, Label, Layout, Spinner } from '@/components'
import { action } from './action'
import { COMP_CONST, MAX_X, MAX_Y, MIN_X, MIN_Y } from './julia.constants'

const Page = () => {
  const { juliaForm, onSubmit, isLoading, png } = action()

  return (
    <Layout>
      <Form {...juliaForm}>
        <form
          onSubmit={juliaForm.handleSubmit(onSubmit)}
          className='grid gap-7'
        >
          <FormInput form={juliaForm} name='min_x' label={MIN_X} />
          <FormInput form={juliaForm} name='max_x' label={MAX_X} />
          <FormInput form={juliaForm} name='min_y' label={MIN_Y} />
          <FormInput form={juliaForm} name='max_y' label={MAX_Y} />
          <Label>{COMP_CONST}</Label>
          <div className='flex'>
            <FormInput
              form={juliaForm}
              name='comp_const_a'
              label={`${COMP_CONST}_a`}
            />
            +
            <FormInput
              form={juliaForm}
              name='comp_const_b'
              label={`${COMP_CONST}_b`}
            />
            i
          </div>
          <Button type='submit'>Submit</Button>
        </form>
      </Form>

      {png && (
        <div className='julia'>{png && <img alt='julia_set' src={png} />}</div>
      )}

      {isLoading && <Spinner size='large' />}
    </Layout>
  )
}

export default Page
